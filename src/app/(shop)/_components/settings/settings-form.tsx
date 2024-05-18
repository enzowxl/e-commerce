'use client'

import { Address } from '@prisma/client'
import { Session } from 'next-auth'
import React, { ChangeEvent, FocusEvent, FormEvent } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { api } from '@/utils/api'

export function SettingsForm({
  session,
  address,
}: {
  session: Session
  address: Address
}) {
  const [formData, setFormData] = React.useState({
    address: address?.address ?? '',
    number: address?.number ?? '',
    complement: address?.complement ?? '',
    zipcode: address?.zip ?? '',
    district: address?.district ?? '',
    city: address?.city ?? '',
    state: address?.state ?? '',
  })
  const [foundData, updateFoundData] = React.useState(!!address?.zip)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleZipcodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    const formattedValue = value
      .replace(/\D/g, '')
      .replace(/(\d{5})(\d)/, '$1-$2')
    setFormData({ ...formData, [name]: formattedValue })
    updateFoundData(false)
  }

  const handleZipcodeBlur = async (event: FocusEvent<HTMLInputElement>) => {
    const cep = event.target.value.replace(/\D/g, '')
    if (cep.length === 8) {
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
          updateFoundData(false)
        }
      } catch (error) {}
    }
  }

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formDataSend = new FormData(event.currentTarget)

    Array.from(formDataSend.keys()).forEach((key) => {
      formDataSend.delete(key)
    })

    formDataSend.append('email', session?.user?.email as string)
    formDataSend.append('address', formData.address)
    formDataSend.append('number', formData.number.toString())
    formDataSend.append('complement', formData.complement)
    formDataSend.append('zipcode', formData.zipcode)
    formDataSend.append('district', formData.district)
    formDataSend.append('city', formData.city)
    formDataSend.append('state', formData.state)

    Array.from(formDataSend.keys()).forEach((key) => {
      const value = formDataSend.get(key)

      if (typeof value === 'string' && value === '') {
        formDataSend.delete(key)
      }

      if (value instanceof File && value.size <= 0) {
        formDataSend.delete(key)
      }
    })

    await api(`/auth/users/address`, {
      method: 'POST',
      body: formDataSend,
    })
      .then(async (res) => {
        if (!res.ok) {
          const { error } = await res.json()
          return toast.error(error, {
            duration: 3000,
          })
        }

        toast.success('Successful saving settings', {
          duration: 3000,
        })
      })
      .catch((err) => {
        return console.log(err)
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
            onChange={handleZipcodeChange}
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
