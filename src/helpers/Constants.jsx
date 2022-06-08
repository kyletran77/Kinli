import { AiFillHome, AiFillCompass } from "react-icons/ai";
import { RiInboxArchiveFill } from "react-icons/ri";
import { MdOutlineLogout } from "react-icons/md";
import { BsFillBookmarkFill } from "react-icons/bs";

export const navLinks = [
  { pathTo: "/", icon: <AiFillHome />, navPath: "Home" },
  { pathTo: "/explore", icon: <AiFillCompass />, navPath: "Explore" },
  { pathTo: "/bookmarks", icon: <BsFillBookmarkFill />, navPath: "Bookmarks" },
  { pathTo: "/archives", icon: <RiInboxArchiveFill />, navPath: "Archives" },
  { pathTo: "/logout", icon: <MdOutlineLogout />, navPath: "Logout" },
];

const avatars = [
  {
    avatar:
      "https://cdn.dribbble.com/users/49910/screenshots/4431133/attachments/1006779/avatar_01.png?compress=1&resize=200x300&vertical=top",
    cover:
      "https://cdn.dribbble.com/users/2506205/screenshots/14575160/media/faa352616ce5eab06e359680c8811fa6.jpg?compress=1&resize=1200x900&vertical=top",
  },
  {
    avatar:
      "https://cdn.dribbble.com/users/49910/screenshots/4431133/attachments/1006782/avatar_02.png?compress=1&resize=200x300&vertical=top",
    cover:
      "https://cdn.dribbble.com/users/2506205/screenshots/5097976/media/957a3b406c0887d4e2cf21f63db005b0.jpg?compress=1&resize=1200x900&vertical=top",
  },
  {
    avatar:
      "https://cdn.dribbble.com/users/49910/screenshots/4431133/attachments/1006783/avatar_03.png?compress=1&resize=200x300&vertical=top",
    cover:
      "https://cdn.dribbble.com/users/2506205/screenshots/14575160/media/faa352616ce5eab06e359680c8811fa6.jpg?compress=1&resize=1200x900&vertical=top",
  },
  {
    avatar:
      "https://cdn.dribbble.com/users/49910/screenshots/4431133/attachments/1006784/avatar_04.png?compress=1&resize=200x300&vertical=top",
    cover:
      "https://cdn.dribbble.com/users/2506205/screenshots/14575150/media/c196e7c5f0371159c8686133bb7a8a9a.jpg?compress=1&resize=1200x900&vertical=top",
  },
];

export const defaultAvatar =
  avatars[Math.floor(Math.random() * avatars.length)];
