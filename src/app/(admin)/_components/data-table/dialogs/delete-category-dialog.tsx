import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { api } from '@/utils/api'

export function DeleteCategoryDialog({
  open,
  slug,
  onOpenChange,
}: {
  open: boolean
  slug: string
  onOpenChange: (open: boolean) => void
}) {
  const router = useRouter()

  async function handleDelete() {
    await api(`/category/${slug}`, {
      method: 'DELETE',
    })
      .then(async (res) => {
        if (!res.ok) {
          const { error } = await res.json()
          return toast.error(error, {
            duration: 3000,
          })
        }

        toast.success('Category successfully deleted', {
          duration: 3000,
        })
      })
      .catch((err) => {
        return console.log(err)
      })

    onOpenChange(!open)

    return router.refresh()
  }
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete category</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-8 max-sm:text-center">
          Are you sure you want to delete a category?
          <div className="w-full flex flex-col gap-8">
            <Button
              onClick={handleDelete}
              type="submit"
              className="text-white w-full bg-color-primary h-12 rounded-xl"
            >
              Delete
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
