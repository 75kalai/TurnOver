import React from 'react'
import "./interestsStyle.css"
import checkbox from "./checkbox.png"
import checkboxUnselected from "./checkbox-unselected.png"
import Image from 'next/image'

import { MdKeyboardArrowLeft,MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";

export default function Interests() {
     const isSelected = true;
     return (
          <div className='interests'>
               <p className="title">Please mark your interests!</p>
               <div className="description-1">
                    We will keep you notifed.
               </div>
               <div className="description-2">
                    My saved interests!
               </div>
               <ul className="interests-list">
                    <li className="item">
                         {isSelected ?
                              <Image className='check-box' width={24} height={24} src={checkbox} />
                              :
                              <Image className='check-box' width={24} height={24} src={checkboxUnselected} />
                         }
                         <span>Shoes</span>
                    </li>
                    <li className="item">
                         {false ?
                              <Image className='check-box' width={24} height={24} src={checkbox} />
                              :
                              <Image className='check-box' width={24} height={24} src={checkboxUnselected} />
                         }
                         <span>Mens T-Shirt</span>
                    </li>
               </ul>
               <div className="pagination">
                    <MdKeyboardDoubleArrowLeft />
                    <MdKeyboardArrowLeft />
                    <span>1</span>
                    <span>2</span>
                    <span className='current-page'>3</span>
                    <span>4</span>
                    <span>5</span>

                    <MdKeyboardArrowRight />
                    <MdKeyboardDoubleArrowRight />
               </div>
          </div>
     )
}
