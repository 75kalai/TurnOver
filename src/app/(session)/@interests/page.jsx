"use client"
import React, { useState, useEffect, useContext } from 'react'
import "./interestsStyle.css"
import checkbox from "./checkbox.png"
import checkboxUnselected from "./checkbox-unselected.png"
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import Cookies from 'js-cookie'
import { UserContext } from '@/app/layout'

export default function Interests() {

     const LIST_SIZE = 6;
     const { userData, setUserData } = useContext(UserContext);
     const router = useRouter()
     const searchParams = useSearchParams()
     const [listData, setListData] = useState([])
     const [pageIndex, setPageIndex] = useState(1)
     const [paginationArr, setPaginationArr] = useState([])

     const token = Cookies.get('token')
     if (!token) {
          // NO Cookie/TOKEN, user session must be unset
          setUserData(null)
          return;
     }

     useEffect(() => {
          let pageNum = parseInt(searchParams.get("page"))
          pageNum = (isNaN(pageNum)) || (typeof pageNum != "number") ? 1 : pageNum;

          fetchListsForPage(pageNum)
     }, [])

     async function fetchListsForPage(pageNum) {
          setPageIndex(pageNum);
          const response = await fetch(
               `/api/interests?page=${pageNum}&size=${LIST_SIZE}`,
               {
                    headers: {
                         Authorization: `Bearer ${token}`,
                    }
               }
          )
          const body = await response.json()
          setListData(body.data);
          setPaginationArr( computePagination(pageNum) )
          
     }

     async function handleListClick(list) {

          let response = await fetch(
               `/api/interests/${list.category_id}`,
               {
                    method: "PUT",
                    headers: {
                         Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                         setSelected: !list.isSelected
                    })
               }
          )
          let body = await response.json()
          if (body.code == 0) {
               setListData(prev => {
                    let newList = prev.list.map((prevList) => {
                         if (prevList.category_id == list.category_id) {
                              return {
                                   ...prevList,
                                   isSelected: !list.isSelected
                              }
                         } else {
                              return prevList
                         }
                    })
                    return {
                         ...prev,
                         list:newList
                    }
               })
          }
     }

     function computePagination(n) {
          const start = 1
          const end = Math.ceil(listData?.totalRows/LIST_SIZE)
          const offset = 2

          let result = []

          if (n <= start + offset) {
               n = start + offset
          }
          if (n + offset >= end) {
               n = end - offset
          }

          result.push(n - 2)
          result.push(n - 1)
          result.push(n)
          result.push(n + 1)
          result.push(n + 2)

          return result
     }

     function getLastPageNum(){
          
     }

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
                    {listData?.list?.map((list) => {
                         return (
                              <li className="item" key={list.category_id} onClick={() => { handleListClick(list) }}>
                                   {list.isSelected ?
                                        <Image className='check-box' width={24} height={24} src={checkbox} alt="checked" />
                                        :
                                        <Image className='check-box' width={24} height={24} src={checkboxUnselected} alt="unchecked" />
                                   }
                                   <span>{list.category_name}</span>
                              </li>
                         )
                    })}
               </ul>
               <div className="pagination">
                    <MdKeyboardDoubleArrowLeft className='page'  onClick={()=>{ fetchListsForPage( 1 )}}/>
                    <MdKeyboardArrowLeft className='page' onClick={()=>{ (pageIndex-1>=1) && fetchListsForPage( pageIndex-1 )}}/>

                    {paginationArr.map((num) => {
                         return (
                              <span key={num} className={"page "+(num == pageIndex ? "current-page" : "")} onClick={ ()=>{fetchListsForPage(num)} }>
                                   {num}
                              </span>
                         )
                    })}

                    <MdKeyboardArrowRight className='page'  onClick={()=>{ (pageIndex+1 <= Math.ceil(listData?.totalRows/LIST_SIZE)) && fetchListsForPage( pageIndex+1 )}}/>
                    <MdKeyboardDoubleArrowRight className='page'  onClick={()=>{ fetchListsForPage( Math.ceil(listData?.totalRows/LIST_SIZE) )}}/>
               </div>
          </div>
     )
}
