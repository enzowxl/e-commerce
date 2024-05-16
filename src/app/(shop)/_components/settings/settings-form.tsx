'use client'

import { Prisma } from '@prisma/client'
import React, { ChangeEvent, FocusEvent, FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface UserPayload
  extends Prisma.UserGetPayload<{
    include: {
      address: true
    }
  }> {}

export function SettingsForm({ me }: { me: UserPayload }) {
  const [formData, setFormData] = React.useState({
    address: me?.address?.address ?? '',
    number: me?.address?.number ?? '',
    complement: me?.address?.complement ?? '',
    zipcode: me?.address?.zip ?? '',
    district: me?.address?.district ?? '',
    city: me?.address?.city ?? '',
    state: me?.address?.state ?? '',
  })
  const [foundData, updateFoundData] = React.useState(false)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    updateFoundData(false)
  }

  const handleZipcodeBlur = async (e: FocusEvent<HTMLInputElement>) => {
    const cep = e.target.value
    if (cep.length === 8 || cep.length === 9) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const data = await response.json()
        if (!data.erro) {
          setFormData({
            ...formData,
            address: data.logradouro,
            district: data.bairro,
            city: data.localidade,
            state: data.uf,
          })
          updateFoundData(true)
        } else {
          console.log('CEP não encontrado')
          updateFoundData(false)
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error)
      }
    }
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    Array.from(formData.keys()).forEach((key) => {
      const value = formData.get(key)

      if (typeof value === 'string' && value === '') {
        formData.delete(key)
      }

      if (value instanceof File && value.size <= 0) {
        formData.delete(key)
      }
    })
  }
  return (
    <form onSubmit={handleSave} className="w-full flex flex-col gap-8">
      <div className="flex items-center gap-3">
        <div className="w-full flex flex-col gap-3">
          <Label>Address</Label>
          <Input
            disabled={foundData}
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
            placeholder="Avenida Copacabana"
            type="text"
            required
          />
        </div>
        <div className="flex flex-col gap-3">
          <Label>Number</Label>
          <Input
            name="number"
            value={formData.number}
            onChange={handleInputChange}
            className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
            placeholder="320"
            type="number"
            required
            min={1}
          />
        </div>
      </div>
      <div className="w-full flex flex-col gap-3">
        <Label>Complement</Label>
        <Input
          name="complement"
          value={formData.complement}
          onChange={handleInputChange}
          className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
          placeholder="Apt 342 B"
          type="text"
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex flex-col gap-3">
          <Label>Zip code</Label>
          <Input
            name="zipcode"
            value={formData.zipcode}
            onChange={handleInputChange}
            onBlur={handleZipcodeBlur}
            className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
            placeholder="06472-001"
            type="text"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label>District</Label>
          <Input
            disabled={foundData}
            name="district"
            value={formData.district}
            onChange={handleInputChange}
            className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
            placeholder="Sítio Tamboré Alphaville"
            type="text"
            required
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-full flex flex-col gap-3">
          <Label>City</Label>
          <Input
            name="city"
            disabled={foundData}
            value={formData.city}
            onChange={handleInputChange}
            className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
            placeholder="Barueri"
            type="text"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-3">
          <Label>State</Label>
          <Input
            disabled={foundData}
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
            placeholder="São Paulo"
            type="text"
            required
          />
        </div>
      </div>
      <Button
        type="submit"
        className="text-white font-medium text-lg w-full bg-color-primary h-12 rounded-xl"
      >
        Save
      </Button>
    </form>
  )
}
