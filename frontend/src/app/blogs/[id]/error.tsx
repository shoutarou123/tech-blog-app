"use client";
import React from 'react'

function Error({error}:{error: Error}) {
  return (
    <div>{error.message}</div>
  )
}

export default Error
