import { motion } from 'framer-motion'
import React from 'react'

const transition = {
  type: 'spring',
  stiffness: 150,
  damping: 10,
}

export const MoonIcon = () => {
  const variants = {
    initial: { scale: 0.6, rotate: 90 },
    animate: { scale: 1, rotate: 0, transition },
    whileTap: { scale: 0.95, rotate: 15 },
  }
  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      width='22'
      height='22'
      viewBox='0 0 50 50'
      key='moon'
    >
      <motion.path
        d='M 43.81 29.354 C 43.688 28.958 43.413 28.626 43.046 28.432 C 42.679 28.238 42.251 28.198 41.854 28.321 C 36.161 29.886 30.067 28.272 25.894 24.096 C 21.722 19.92 20.113 13.824 21.683 8.133 C 21.848 7.582 21.697 6.985 21.29 6.578 C 20.884 6.172 20.287 6.022 19.736 6.187 C 10.659 8.728 4.691 17.389 5.55 26.776 C 6.408 36.163 13.847 43.598 23.235 44.451 C 32.622 45.304 41.28 39.332 43.816 30.253 C 43.902 29.96 43.9 29.647 43.81 29.354 Z'
        fill='none'
        initial='initial'
        animate='animate'
        whileTap='whileTap'
        stroke='currentColor'
        strokeWidth='2.5'
        variants={variants}
      />
    </motion.svg>
  )
}

export const SunIcon = () => {
  const variants = {
    initial: { scale: 0.6, rotate: 90 },
    animate: { scale: 1, rotate: 0, transition },
    whileTap: { scale: 0.95, rotate: 15 },
  }

  return (
    <motion.svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      className='h-6 w-6'
      style={{ originX: '50%', originY: '50%' }}
    >
      <motion.path
        initial='initial'
        animate='animate'
        variants={variants}
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z'
      />
    </motion.svg>
  )
}

export const SchoolOutline = () => {
  return (
    <svg
      width='14px'
      height='14px'
      viewBox='0 0 14 14'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      stroke='currentColor'
    >
      <title>ionicons-v5-q</title>
      <path d='M7 10.063a0.438 0.438 0 0 1 -0.217 -0.058L2.953 7.816a0.219 0.219 0 0 0 -0.328 0.19V10.063a0.438 0.438 0 0 0 0.225 0.383l3.938 2.188a0.438 0.438 0 0 0 0.425 0l3.938 -2.188A0.438 0.438 0 0 0 11.375 10.063V8.006a0.219 0.219 0 0 0 -0.328 -0.19L7.217 10.005A0.438 0.438 0 0 1 7 10.063Z' />
      <path d='M13.56 5.209s0 -0.002 0 -0.003a0.438 0.438 0 0 0 -0.219 -0.336l-6.125 -3.5a0.438 0.438 0 0 0 -0.434 0l-6.125 3.5a0.438 0.438 0 0 0 0 0.76l6.125 3.5a0.438 0.438 0 0 0 0.434 0L12.605 6.051a0.055 0.055 0 0 1 0.082 0.048V10.05c0 0.235 0.181 0.438 0.416 0.449A0.438 0.438 0 0 0 13.563 10.063V5.25A0.404 0.404 0 0 0 13.56 5.209Z' />
    </svg>
  )
}

export const BusinessOutline = () => {
  return (
    <svg
      width='14px'
      height='14px'
      viewBox='0 0 14 14'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      stroke='currentColor'
    >
      <title>ionicons-v5-h</title>
      <path d='M11.813 4.813H8.75V1.75a1.313 1.313 0 0 0 -1.313 -1.313H2.188A1.313 1.313 0 0 0 0.875 1.75V13.125a0.438 0.438 0 0 0 0.438 0.438H4.156a0.219 0.219 0 0 0 0.219 -0.219V11.387c0 -0.235 0.181 -0.438 0.416 -0.449A0.438 0.438 0 0 1 5.25 11.375v1.969a0.219 0.219 0 0 0 0.219 0.219H12.688a0.438 0.438 0 0 0 0.438 -0.438V6.125A1.313 1.313 0 0 0 11.813 4.813ZM2.682 11.809a0.438 0.438 0 1 1 0.377 -0.377A0.438 0.438 0 0 1 2.682 11.809Zm0 -2.188a0.438 0.438 0 1 1 0.377 -0.377A0.438 0.438 0 0 1 2.682 9.621Zm0 -2.188a0.438 0.438 0 1 1 0.377 -0.377A0.438 0.438 0 0 1 2.682 7.434Zm0 -2.188a0.438 0.438 0 1 1 0.377 -0.377A0.438 0.438 0 0 1 2.682 5.246Zm0 -2.188a0.438 0.438 0 1 1 0.377 -0.377A0.438 0.438 0 0 1 2.682 3.059Zm2.188 6.563a0.438 0.438 0 1 1 0.377 -0.377A0.438 0.438 0 0 1 4.869 9.621Zm0 -2.188a0.438 0.438 0 1 1 0.377 -0.377A0.438 0.438 0 0 1 4.869 7.434Zm0 -2.188a0.438 0.438 0 1 1 0.377 -0.377A0.438 0.438 0 0 1 4.869 5.246Zm0 -2.188a0.438 0.438 0 1 1 0.377 -0.377A0.438 0.438 0 0 1 4.869 3.059Zm2.188 8.75a0.438 0.438 0 1 1 0.377 -0.377A0.438 0.438 0 0 1 7.057 11.809Zm0 -2.188a0.438 0.438 0 1 1 0.377 -0.377A0.438 0.438 0 0 1 7.057 9.621Zm0 -2.188a0.438 0.438 0 1 1 0.377 -0.377A0.438 0.438 0 0 1 7.057 7.434Zm0 -2.188a0.438 0.438 0 1 1 0.377 -0.377A0.438 0.438 0 0 1 7.057 5.246Zm0 -2.188a0.438 0.438 0 1 1 0.377 -0.377A0.438 0.438 0 0 1 7.057 3.059ZM12.141 12.688H8.75V5.688H11.813a0.438 0.438 0 0 1 0.438 0.438V12.578A0.109 0.109 0 0 1 12.141 12.688Z' />
      <path d='M10.938 10.938a0.438 0.438 0 1 0 0.438 0.438 0.438 0.438 0 0 0 -0.438 -0.438Z' />
      <path d='M10.938 8.75a0.438 0.438 0 1 0 0.438 0.438 0.438 0.438 0 0 0 -0.438 -0.438Z' />
      <path d='M10.938 6.563a0.438 0.438 0 1 0 0.438 0.438 0.438 0.438 0 0 0 -0.438 -0.438Z' />
      <path d='M9.188 10.938a0.438 0.438 0 1 0 0.438 0.438 0.438 0.438 0 0 0 -0.438 -0.438Z' />
      <path d='M9.188 8.75a0.438 0.438 0 1 0 0.438 0.438 0.438 0.438 0 0 0 -0.438 -0.438Z' />
      <path d='M9.188 6.563a0.438 0.438 0 1 0 0.438 0.438 0.438 0.438 0 0 0 -0.438 -0.438Z' />
    </svg>
  )
}

export const TeamLine = () => {
  return (
    <svg
      width='15px'
      height='15px'
      fill='currentColor'
      viewBox='0 0 15 15'
      enableBackground='new 0 0 32 32'
      id='Layer_3'
      version='1.1'
      xmlSpace='preserve'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
    >
      <g>
        <path d='M4.688 8.316V9.844c0 0.259 0.21 0.469 0.469 0.469h0.607l0.332 3.328C6.12 13.88 6.322 14.063 6.563 14.063h1.875c0.241 0 0.443 -0.182 0.466 -0.422l0.332 -3.328H9.844c0.259 0 0.469 -0.21 0.469 -0.469v-1.528C10.313 7.349 9.526 6.563 8.559 6.563H7.5h-1.059C5.474 6.563 4.688 7.349 4.688 8.316zM8.559 7.5C9.009 7.5 9.375 7.866 9.375 8.316V9.375h-0.563c-0.241 0 -0.443 0.182 -0.466 0.422L8.013 13.125h-1.027l-0.332 -3.328C6.63 9.557 6.428 9.375 6.188 9.375H5.625v-1.059C5.625 7.866 5.991 7.5 6.441 7.5H8.559z' />
        <path d='M5.625 4.688c0 1.034 0.841 1.875 1.875 1.875s1.875 -0.841 1.875 -1.875V4.187C9.375 3.429 8.758 2.813 8 2.813h-1C6.242 2.813 5.625 3.429 5.625 4.187V4.688zM6.563 4.187C6.563 3.946 6.758 3.75 7 3.75h1C8.242 3.75 8.438 3.946 8.438 4.187V4.688c0 0.517 -0.42 0.938 -0.938 0.938s-0.938 -0.42 -0.938 -0.938V4.187z' />
        <path d='M12.309 4.688H11.25h-1.059c-0.259 0 -0.469 0.21 -0.469 0.469s0.21 0.469 0.469 0.469h2.118C12.759 5.625 13.125 5.991 13.125 6.441V7.5h-0.563c-0.241 0 -0.443 0.182 -0.466 0.422L11.763 11.25H10.313c-0.259 0 -0.469 0.21 -0.469 0.469s0.21 0.469 0.469 0.469h1.875c0.241 0 0.443 -0.182 0.466 -0.422l0.332 -3.328H13.594c0.259 0 0.469 -0.21 0.469 -0.469v-1.528C14.063 5.474 13.276 4.688 12.309 4.688z' />
        <path d='M1.406 8.438h0.607l0.332 3.328C2.37 12.005 2.572 12.188 2.813 12.188h1.875c0.259 0 0.469 -0.21 0.469 -0.469s-0.21 -0.469 -0.469 -0.469H3.237l-0.332 -3.328C2.88 7.682 2.678 7.5 2.438 7.5H1.875v-1.059C1.875 5.991 2.241 5.625 2.691 5.625h2.118c0.259 0 0.469 -0.21 0.469 -0.469s-0.21 -0.469 -0.469 -0.469H3.75H2.691C1.724 4.688 0.938 5.474 0.938 6.441V7.969C0.938 8.227 1.147 8.438 1.406 8.438z' />
        <path d='M13.125 2.813V2.312C13.125 1.554 12.508 0.938 11.75 0.938h-1C9.992 0.938 9.375 1.554 9.375 2.312V2.813c0 1.034 0.841 1.875 1.875 1.875S13.125 3.847 13.125 2.813zM12.188 2.813c0 0.517 -0.42 0.938 -0.938 0.938s-0.938 -0.42 -0.938 -0.938V2.312C10.313 2.071 10.508 1.875 10.75 1.875h1C11.992 1.875 12.188 2.071 12.188 2.312V2.813z' />
        <path d='M5.625 2.813V2.312C5.625 1.554 5.008 0.938 4.25 0.938H3.25C2.492 0.938 1.875 1.554 1.875 2.312V2.813c0 1.034 0.841 1.875 1.875 1.875S5.625 3.847 5.625 2.813zM4.688 2.813c0 0.517 -0.42 0.938 -0.938 0.938S2.813 3.33 2.813 2.813V2.312C2.813 2.071 3.008 1.875 3.25 1.875h1C4.492 1.875 4.688 2.071 4.688 2.312V2.813z' />
      </g>
    </svg>
  )
}

export const ChalkboardTeacher = () => {
  return (
    <svg
      width='14px'
      height='14px'
      viewBox='0 -1.4 14 14'
      xmlns='http://www.w3.org/2000/svg'
      fill='currentColor'
    >
      <path d='M4.55 7.7c-0.052 0 -0.105 0.008 -0.154 0.024C4.112 7.816 3.814 7.875 3.5 7.875c-0.314 0 -0.612 -0.059 -0.896 -0.151 -0.05 -0.016 -0.102 -0.024 -0.154 -0.024C1.092 7.7 -0.007 8.804 0 10.164 0.003 10.738 0.475 11.2 1.05 11.2h4.9c0.575 0 1.047 -0.462 1.05 -1.036 0.007 -1.359 -1.092 -2.464 -2.45 -2.464zm-1.05 -0.7c1.16 0 2.1 -0.94 2.1 -2.1s-0.94 -2.1 -2.1 -2.1 -2.1 0.94 -2.1 2.1 0.94 2.1 2.1 2.1zM12.95 0H4.55c-0.579 0 -1.05 0.487 -1.05 1.085V2.1c0.512 0 0.987 0.148 1.4 0.389V1.4h7.7v6.3h-1.4v-1.4H8.4v1.4h-1.668c0.418 0.365 0.724 0.847 0.868 1.4H12.95c0.579 0 1.05 -0.487 1.05 -1.085V1.085C14 0.487 13.529 0 12.95 0z' />
    </svg>
  )
}

export const Rocket = () => {
  return (
    <svg
      width='14px'
      height='14px'
      viewBox='0 0 14 14'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g
        fill='none'
        fillRule='evenodd'
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        transform='translate(2.5)'
      >
        <path d='m4.333 12.333c2 -1.668 2.667 -3.668 2.667 -6 0 -2.332 -0.667 -4.332 -2.667 -6 -2 1.668 -2.667 3.668 -2.667 6 0 2.332 0.667 4.332 2.667 6z' />
        <path d='m6.708 8.908c0.283 0.163 0.543 0.364 0.781 0.602 0.746 0.746 1.127 1.716 1.142 2.91 -1.672 -0.073 -2.588 -0.51 -3.284 -1.098m-3.41 -2.413c-0.283 0.163 -0.543 0.364 -0.781 0.602 -0.746 0.746 -1.127 1.716 -1.142 2.91 1.672 -0.073 2.588 -0.51 3.284 -1.098' />
        <path
          cx='6.5'
          cy='6.5'
          r='2'
          d='M5.667 4.333A1.333 1.333 0 0 1 4.333 5.667A1.333 1.333 0 0 1 3 4.333A1.333 1.333 0 0 1 5.667 4.333z'
        />
      </g>
    </svg>
  )
}

export const Coffee = () => {
  return (
    <svg
      width='14px'
      height='14px'
      viewBox='0 0 14 14'
      xmlns='http://www.w3.org/2000/svg'
      stroke='currentColor'
      fill='none'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='feather feather-coffee'
    >
      <path d='M10.5 4.667h0.583a2.333 2.333 0 0 1 0 4.667h-0.583' />
      <path d='M1.167 4.667h9.333v5.25a2.333 2.333 0 0 1 -2.333 2.333H3.5a2.333 2.333 0 0 1 -2.333 -2.333V4.667z' />
      <path x1='6' y1='1' x2='6' y2='4' d='M3.5 0.583L3.5 2.333' />
      <path x1='10' y1='1' x2='10' y2='4' d='M5.833 0.583L5.833 2.333' />
      <path x1='14' y1='1' x2='14' y2='4' d='M8.167 0.583L8.167 2.333' />
    </svg>
  )
}

export const LogoIcon = () => (
  <motion.svg
    width='192'
    height='192'
    viewBox='0 0 192 192'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <motion.path
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration: 3,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
        repeatDelay: 1,
      }}
      strokeWidth={1.5}
      strokeDasharray='0 1'
      fill='none'
      fillRule='evenodd'
      clipRule='evenodd'
      d='M78.9922 22.2825C70.8177 24.266 59.2887 29.5095 52.3922 34.3779L48.5469 37.0935V79.3091V121.523L59.7333 110.391L70.9198 99.2585L82.1063 110.391L93.2927 121.523V112.744C93.2927 112.744 91.8413 110.28 82.1133 100.6L70.9352 89.4756L63.2361 97.0861L55.5384 104.697V72.9191V66.8287V41.1416L60.8744 37.6072C85.7419 21.1333 121.086 25.2948 143.052 47.2824C181.673 85.9454 160.403 151.012 106.097 160.335C85.8412 163.812 64.5477 156.771 49.4012 141.589C28.3637 120.503 25.3038 87.2947 36.6892 64.2322C39.3656 58.8109 39.5 58 41.5 54C41.5 54 41.5 48.5 41.5 42C41.5 42 22 61 22 93.7533C21.8951 129.957 49.7592 162.357 85.4231 167.5C125.443 173.273 163.488 144.797 169.25 104.76C176.586 53.7885 128.863 10.1801 78.9922 22.2825ZM86.3473 67.2439C86.3473 67.2439 86.3068 69.7318 86.3473 81.4479C86.3865 92.6012 86.3473 95.7439 86.3473 95.7439L93.2927 101.642C93.2927 101.642 93.2927 94.9935 93.2927 87.2947V73.2971L106.227 73.3279C121.625 73.3643 129.454 76.2128 133.81 83.3642C137.518 89.4546 137.518 99.1326 133.81 105.223C130.619 110.461 121.532 115.213 114.617 115.259L110.072 115.29V98.4929V81.6957H106.539H103.004L103.393 101.642L103.78 121.589L113.63 121.414C124.651 121.22 133.003 117.881 137.827 111.742C148.119 98.644 143.833 77.8043 129.298 70.2736C124.36 67.7162 120.641 67.1339 107.276 66.8287C98.4315 66.6258 86.3473 67.2439 86.3473 67.2439Z'
    />
  </motion.svg>
)
