import React from 'react'
import { Container, Card, Button, OverlayTrigger, Popover, DropdownButton, Dropdown, Alert, Col, Row, Image, NavDropdown, Badge } from 'react-bootstrap'

function MY_Button({val,requestHandler}) {
  return (
    <>
    {val()&&<Button variant="danger" onClick={requestHandler}>Cancel Request</Button>}
    {!val()&&<Button variant="danger" onClick={requestHandler}>Cancel Request</Button>}
    </>
  )
}

export default MY_Button