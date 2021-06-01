import React,{useState,useEffect} from 'react'
import './components.css'

export default function Cursor_Pointer(){
    const [position,setPosition] = useState({x:0,y:0})
    const [clicked,setClicked] = useState(false)
    const [linkHovered,setLinkedHover] = useState(false)
    const [hidden,setHidden] = useState(false)

    useEffect(()=>{
        addEventListeners()
        handleLinkHoverEvents()
        return () => 
        removeEventListeners()
    })

    const addEventListeners = () => {
        document.addEventListener("mousemove",onMouseMove)
        document.addEventListener("mousedown",onMouseDown)
        document.addEventListener("mouseup",onMouseUp)
        document.addEventListener("mouseleave",onMouseLeave)
        document.addEventListener("mouseenter",onMouseEnter)
    }
    
    const removeEventListeners = () => {
        document.removeEventListener("mousemove",onMouseMove)
        document.removeEventListener("mousedown",onMouseDown)
        document.removeEventListener("mouseup",onMouseUp)
        document.removeEventListener("mouseleave",onMouseLeave)
        document.removeEventListener("mouseenter",onMouseEnter)
    }

    const onMouseMove = (e) => {
        setPosition({x:e.clientX,y:e.clientY})
    }

    const onMouseDown = () => {
        setClicked(true)
    }

    const onMouseUp = () => {
        setClicked(false);
    }

    const onMouseLeave = () => {
        setHidden(true)
    }

    const onMouseEnter = () => {
        setHidden(false)
    }


    const handleLinkHoverEvents = () => {
        document.querySelectorAll("button").forEach((e)=>{
            e.addEventListener("mouseover",setLinkedHover(true))
            e.addEventListener("mouseout",setLinkedHover(false))
        })
    }
    /*const cursorClasses = classNames("cursor", {
        "cursor--clicked": clicked,
        "cursor--hidden": hidden,
        "cursor--link-hovered": linkHovered
    });*/
    //const cursorClasses = className("cursor",{"cursor-clicked":clicked,"cursor-hidden":hidden,"cursor-link-hovered":linkHovered})

    return(
        <div 
            className={"cursor",{"cursor-clicked":clicked,"cursor-hidden":hidden,"cursor-link-hovered":linkHovered}}
            style={{left:`${position.x}px`,top:`${position.y}py`}}/>
    )
}