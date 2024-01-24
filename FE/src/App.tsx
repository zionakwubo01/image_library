import { useEffect, useState } from "react"
import { Createpictures, Readpictures } from "./api/Pictureapi"




const App = () => {

  const [state, setState] = useState<Array<{}>>()


  useEffect(() => {
    Readpictures().then((res: any) => {
      // console.log("this is state", res)
      setState(res.data)
    })
  }, [])

  // const [state, SetState] = useState()
  const [image, setImage] = useState<string>("")
  const [avatar, setAvatar] = useState<string>("")

  const Handleimage = (e: any) => {
    const localimage = e.target.files[0]
    const saveFile = URL.createObjectURL(localimage)
    setImage(localimage)
    setAvatar(saveFile)
  }


  const onSubmit = () => {
    const formData = new FormData()

    formData.append("singleimg", image)
    Createpictures(formData).then((res) => {
      // console.log("this is res", res)
    })
  }


  // console.log("this is state", state)
  return (
    <div>
      <div className="w-full h-full flex items-center justify-center  flex-col gap-5 p-5">

        <label htmlFor="image"
          className="bg-red-500 p-3"
        >upload</label>
        <input
          className="hidden"
          id="image"
          type="file"
          accept="image/png, image/gif, image/jpeg, image/jpg"
          onChange={Handleimage}
        />
        <div className="w-[240px] h-[300px] bg-red-400">
          <img className="w-[100%] h-[100%] bg-blue-300"
            src={avatar}
          />
        </div>
        <button
          onClick={onSubmit}
          className="bg-blue-500 p-5">
          Create
        </button>


        <div className="w-[80%] min-h-[500px] justify-center
         bg-black p-3 flex flex-row flex-wrap gap-2 items-center">
          {
            state?.map((props: any) => (
              <div className="w-[300px] h-[300px] border">
                <img className="w-[100%] h-[100%] bg-blue-300"
                  src={props?.picture}
                />

              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App