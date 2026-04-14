export interface NavLink {
  to: string;
  label: string;
}


export const navLinks: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/blogs", label: "Blogs" },

];
