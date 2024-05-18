// import { Category } from '@prisma/client'
// import { CircleX, Plus } from 'lucide-react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import React, { FormEvent, ReactNode } from 'react'
// import toast from 'react-hot-toast'

// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectLabel,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetTrigger,
// } from '@/components/ui/sheet'
// import { api } from '@/utils/api'
// export function NewProductSheet({
//   children,
//   open,
//   onOpenChange,
//   complementCategoryData,
// }: {
//   children: ReactNode
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   complementCategoryData?: Category[]
// }) {
//   const router = useRouter()

//   const [sizes, updateSizes] = React.useState<string[]>([])
//   const [colors, updateColors] = React.useState<string[]>([])

//   async function handleCreate(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault()

//     const formData = new FormData(event.currentTarget)

//     if (sizes.length > 0) {
//       formData.delete('sizes')
//       formData.append('sizes', sizes.join(','))
//     }

//     if (colors.length > 0) {
//       formData.delete('colors')
//       formData.append('colors', colors.join(','))
//     }

//     Array.from(formData.keys()).forEach((key) => {
//       const value = formData.get(key)

//       if (typeof value === 'string' && value === '') {
//         formData.delete(key)
//       }

//       if (value instanceof File && value.size <= 0) {
//         formData.delete(key)
//       }
//     })

//     await api('/product', {
//       method: 'POST',
//       body: formData,
//     })
//       .then(async (res) => {
//         if (!res.ok) {
//           const { error } = await res.json()
//           return toast.error(error, {
//             duration: 3000,
//           })
//         }

//         toast.success('Product created successfully', {
//           duration: 3000,
//         })
//       })
//       .catch((err) => {
//         return console.log(err)
//       })

//     updateSizes([])
//     updateColors([])

//     onOpenChange(!open)

//     return router.refresh()
//   }

//   function handleAdd(name: 'sizes' | 'colors', type: 'SIZE' | 'COLOR') {
//     const inputElement = document.getElementsByName(
//       name,
//     )[0] as HTMLInputElement | null
//     const newItem = inputElement?.value as string

//     if (newItem === '') return

//     if (type === 'SIZE') {
//       return updateSizes((oldArray) => [...oldArray, newItem])
//     } else {
//       return updateColors((oldArray) => [...oldArray, newItem])
//     }
//   }

//   function handleRemove(index: number, type: 'SIZE' | 'COLOR') {
//     if (type === 'SIZE') {
//       return updateSizes((oldArray) => [
//         ...oldArray.slice(0, index),
//         ...oldArray.slice(index + 1),
//       ])
//     } else {
//       return updateColors((oldArray) => [
//         ...oldArray.slice(0, index),
//         ...oldArray.slice(index + 1),
//       ])
//     }
//   }

//   return (
//     <Sheet open={open} onOpenChange={onOpenChange}>
//       <SheetTrigger asChild>{children}</SheetTrigger>
//       <SheetContent className="outline-none flex flex-col gap-10" side={'left'}>
//         <div className="flex justify-between items-center">
//           <Link href="/" className="text-2xl font-extrabold text-white">
//             myshop
//           </Link>
//           <SheetClose className="outline-none">
//             <CircleX className="min-w-5 min-h-5 cursor-pointer" />
//           </SheetClose>
//         </div>
//         <div className="flex flex-col gap-4">
//           <Label className="text-lg font-semibold leading-none tracking-tight pb-5">
//             Create product
//           </Label>
//           <form onSubmit={handleCreate} className="w-full flex flex-col gap-8">
//             <div className="flex flex-col gap-3">
//               <Label>
//                 Name <span className="text-red-500">*</span>
//               </Label>
//               <Input
//                 name="name"
//                 className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
//                 placeholder="Black shirt"
//                 type="text"
//                 required
//               />
//             </div>
//             <div className="flex flex-col gap-3">
//               <Label>
//                 Price <span className="text-red-500">*</span>
//               </Label>
//               <Input
//                 name="price"
//                 className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
//                 placeholder="12,00"
//                 type="number"
//                 required
//                 min={1}
//               />
//             </div>
//             <div className="flex flex-col gap-3">
//               <Label>Discount percent</Label>
//               <Input
//                 name="discount"
//                 className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
//                 placeholder="10"
//                 type="number"
//                 min={1}
//               />
//             </div>
//             <div className="flex flex-col gap-3">
//               <Label>Description</Label>
//               <Input
//                 name="description"
//                 className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
//                 placeholder="This is a black shirt"
//                 type="text"
//               />
//             </div>
//             <div className="flex flex-col gap-3">
//               <Label>Category</Label>
//               <Select
//                 disabled={complementCategoryData?.length === 0}
//                 name="categorySlug"
//               >
//                 <SelectTrigger className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none">
//                   <SelectValue placeholder="Select category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Categories</SelectLabel>
//                     {complementCategoryData?.map((category) => {
//                       return (
//                         <SelectItem key={category.id} value={category.slug}>
//                           {category.name}
//                         </SelectItem>
//                       )
//                     })}
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="flex flex-col gap-3">
//               <Label>Sizes</Label>
//               <div className="flex items-center gap-3">
//                 <Input
//                   name="sizes"
//                   className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
//                   placeholder="Large or G"
//                   type="text"
//                 />
//                 <Button
//                   onClick={() => handleAdd('sizes', 'SIZE')}
//                   type="button"
//                   className="bg-color-primary h-full text-color-white p-3 rounded-xl"
//                 >
//                   <Plus className="w-5 h-5" />
//                 </Button>
//               </div>
//               {sizes.map((size, index) => {
//                 return (
//                   <div
//                     className="flex items-center justify-between"
//                     key={index}
//                   >
//                     <Label>{size}</Label>
//                     <Button
//                       onClick={() => handleRemove(index, 'SIZE')}
//                       type="button"
//                       className="bg-color-primary h-full text-color-white p-3 rounded-xl"
//                     >
//                       <CircleX className="w-5 h-5" />
//                     </Button>
//                   </div>
//                 )
//               })}
//             </div>
//             <div className="flex flex-col gap-3">
//               <Label>Colors</Label>
//               <div className="flex items-center gap-3">
//                 <Input
//                   name="colors"
//                   className="w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 px-4 outline-none"
//                   placeholder="Red"
//                   type="text"
//                 />
//                 <Button
//                   onClick={() => handleAdd('colors', 'COLOR')}
//                   type="button"
//                   className="bg-color-primary h-full text-color-white p-3 rounded-xl"
//                 >
//                   <Plus className="w-5 h-5" />
//                 </Button>
//               </div>
//               {colors.map((color, index) => {
//                 return (
//                   <div
//                     className="flex items-center justify-between"
//                     key={index}
//                   >
//                     <Label>{color}</Label>
//                     <Button
//                       onClick={() => handleRemove(index, 'COLOR')}
//                       type="button"
//                       className="bg-color-primary h-full text-color-white p-3 rounded-xl"
//                     >
//                       <CircleX className="w-5 h-5" />
//                     </Button>
//                   </div>
//                 )
//               })}
//             </div>
//             <div className="flex flex-col gap-3">
//               <Label>Photo</Label>
//               <div className="flex items-center w-full bg-color-secondary placeholder:text-color-gray rounded-xl h-12 outline-none">
//                 <Input
//                   name="photo"
//                   className="flex-1 h-full z-50 opacity-0"
//                   placeholder="This is a black shirt"
//                   type="file"
//                   accept="image/*"
//                 />
//                 <Label className="px-4 absolute">Select photo</Label>
//               </div>
//             </div>
//             <Button
//               type="submit"
//               className="text-white w-full bg-color-primary h-12 rounded-xl"
//             >
//               Create
//             </Button>
//           </form>
//         </div>
//       </SheetContent>
//     </Sheet>
//   )
// }
