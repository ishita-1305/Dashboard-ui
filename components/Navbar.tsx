import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  return (
    <div className="bg-primary dark:bg-slate-700 py-2 px-5 flex text-white justify-between">
      {/* <Link href='/'>
        </Link> */}

      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline:none">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback className="text-black">BT</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/profile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link href="/auth">Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// const Navbar = () => {
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decodedToken = JSON.parse(atob(token.split(".")[1]));
//         if (decodedToken.exp * 1000 < Date.now()) {
//           localStorage.removeItem("token");
//           setUser(null);
//           router.push("/auth");
//         } else {
//           setUser(decodedToken);
//         }
//       } catch (error) {
//         console.error("Invalid token:", error);
//         router.push("/auth");
//       }
//     } else {
//       router.push("/auth");
//     }
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setUser(null);
//     router.push("/auth");
//   };

//   return (
//     <div className="bg-primary dark:bg-slate-700 py-2 px-5 flex text-white justify-between">
//       {user ? (
//         <DropdownMenu>
//           <DropdownMenuTrigger className="focus:outline:none">
//             <Avatar>
//               <AvatarImage
//                 src={user?.avatar || "https://github.com/shadcn.png"}
//                 alt={user?.name || "User"}
//               />
//               <AvatarFallback className="text-black">
//                 {user?.name?.charAt(0).toUpperCase() || "U"}
//               </AvatarFallback>
//             </Avatar>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent>
//             <DropdownMenuLabel>My Account</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>
//               <Link href="/profile">Profile</Link>
//             </DropdownMenuItem>
//             <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       ) : (
//         <div className="flex items-center space-x-4">
//           <Link href="/auth" className="text-white hover:underline">
//             Login
//           </Link>
//           <Link href="/auth/register" className="text-white hover:underline">
//             Register
//           </Link>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Navbar;
