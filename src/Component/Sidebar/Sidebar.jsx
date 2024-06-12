import React from 'react'
import { Link } from 'react-router-dom'

export default function Sidebar() {
    return (
        <div className='side-bar b-shadow direction pt-4 px-3'>
            {localStorage.getItem('role') === 'SUPERUSER' ? <ul className='sideBar-li px-1'>
                <li><Link className='dis-link-style' to={'/home/dailyOperations'} >العمليات اليومية</Link></li>
                <li><Link className='dis-link-style' to={'/home/storedItems'} >إدارة المخزون</Link></li>
                <li><Link className='dis-link-style' to={'/home/users'}>إدارة المستخدمين</Link></li>
            </ul> : ''}

        </div>
    )
}
