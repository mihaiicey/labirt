import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export function RestaurantImage({image, alt}){
    return image ? <img src={image } alt={alt} className="w-10 h-10 rounded-full object-cover object-center"/> : ''
}
