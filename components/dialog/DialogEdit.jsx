import { useRouter } from "next/navigation"

const DialogEdit = ( { editPost, setIsOpen, buttonSize, setIsEdit }) => {
    const router = useRouter()
  return (
    <>
        <span>Edit This Entry?</span>
        <div className="flex justify-evenly mt-8">
        <button
          className={`${buttonSize} text-lg font-semibold text-dark-blue-2 border rounded-xl bg-tiffany-500 font-satoshi border-none`}
          onClick={() => {
            router.push(`/edit/${editPost}`)
            setTimeout(() => setIsEdit(false), 300)
          }}
        >
          Edit
        </button>
        <button
          className={`${buttonSize} text-lg font-semibold border rounded-xl bg-tangerine-600 text-white font-satoshi border-none`}
          onClick={() => {
            setIsOpen(false);
            setTimeout(() => setIsEdit(false), 300)
          }}
        >
          Cancel
        </button>

      </div>
    </>
  )
}

export default DialogEdit