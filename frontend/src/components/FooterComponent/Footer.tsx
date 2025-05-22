export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="mx-12 border-t border-black-1000/60 py-4 pl-3 text-center text-xs text-black-1000/60"
    >
      &copy; {new Date().getFullYear()} Banko / StackLevel LLC. All rights
      reserved.
    </footer>
  )
}
