import { Route, Routes } from "react-router-dom"
import ChatList from "./ChatList"
import ChatLayout from "../ChatLayout"
import ChatSet from "./ChatSet"


const Message = () => {
  return (
    <div>
      <Routes>
        <Route element={<ChatLayout />} >
            <Route path="/message/:id" element={<ChatSet />} />
        </Route>
      </Routes>

    </div>
  )
}

export default Message