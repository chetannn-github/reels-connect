import { User } from "../../models/user.model.js";
import { getAllReels } from "../ig/utils/getAllReels.js";
import { getUserInfo } from "../ig/utils/userInfo.js";


export const me = async(req,res) => {
    let user = await User.findById(req.user._id);
    await getUserInfo(user);
    user = await getAllReels(user);
    res.json(user);
}