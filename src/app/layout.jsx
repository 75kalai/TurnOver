import "./globalStyle.css"
import "./layoutStyle.css"
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

export const metadata = {
  title: 'TurnOver Assignment - by 75kalai@gmail.com',
  description: 'Developed by Kalaiarasan',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Archivo+Black&family=Inter:wght@100..900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="header">
          <div className="section-1">
            <span>Help</span>
            <span>Orders & Returns</span>
            <span>Hi, John</span>
          </div>
          <div className="section-2">
            <div className="left">
              ECOMMERCE
            </div>
            <div className="center">
              <span><b>Categories</b></span>
              <span><b>Sale</b></span>
              <span><b>Clearence</b></span>
              <span><b>New Stock</b></span>
              <span><b>Trending</b></span>
            </div>
            <div className="right">
              <CiSearch />
              <CiShoppingCart />
            </div>
          </div>
          <div className="section-3">
            <MdChevronLeft />
            <span>Get 10% off on business sign up</span>
            <MdChevronRight />
          </div>
        </div>

        {children}

      </body>
    </html>
  )
}
