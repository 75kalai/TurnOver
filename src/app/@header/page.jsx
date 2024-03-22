"use client"
import './headerStyle.css'
import React from 'react'
import { useState, useEffect, useContext } from "react";
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { UserContext } from '../layout';

export default function Header() {

     const {userData, setUserData} = useContext(UserContext)

     function logout(){
          
          // quick removal hack, assumes only 1 cookie is present
          // split and extract token=value and add expiry
          document.cookie+="; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
          
          setUserData(null)
     }

     return (
          <div className="header">
               <div className="section-1">
                    <span>Help</span>
                    <span>Orders & Returns</span>
                    <span>Hi, {userData?.name || "Guest"}</span>
                    {userData?.name && <span onClick={logout}>Logout</span>}
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
     )
}
