import { FormEvent, useReducer, useRef } from "react";
import userReducer, { Action, UserData } from './rreducerUser';

const Users = () => {
    const [users, userDispatch] = useReducer(userReducer, [] as UserData[]);
   
    const nameRef = useRef<HTMLInputElement>(null);
    const lnameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneRef = useRef<HTMLInputElement>(null);
    const addressRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        userDispatch({
            type: 'ADD_USER',
            data: {
                name: nameRef.current?.value || '',
                lname: lnameRef.current?.value || '',
                email: emailRef.current?.value || '0',
                phone: phoneRef.current?.value || '',
                addres: addressRef.current?.value || '',
                password:" 0"
            }
        });
    };

    const handleUpdate = (id: number) => {
        userDispatch({
            type: 'UPDATE_USER',
            data: {
                id,
                name: nameRef.current?.value || '',
                lname: lnameRef.current?.value || '',
                email: emailRef.current?.value || '0',
                phone: phoneRef.current?.value || '',
                addres: addressRef.current?.value || '',
            }
        });
    };

    return (
        <>
            <h1>ניהול משתמשים</h1>

            <form onSubmit={handleSubmit}>
                <label>שם:
                    <input type="text" ref={nameRef} />
                </label>
                <label>שם משפחה:
                    <input type="text" ref={lnameRef} />
                </label>
                <label>אימייל:
                    <input type="email" ref={emailRef} />
                </label>
                <label>טלפון:
                    <input type="tel" ref={phoneRef} />
                </label>
                <label>כתובת:
                    <input type="text" ref={addressRef} />
                </label>
                <button type="submit">הוסף משתמש</button>
            </form>

            <div>
                <h2>רשימת משתמשים</h2>
                {users.map(user => (
                    <div key={user.id}>
                        <p>{user.name} {user.lname}</p>
                        <p>{user.email}</p>
                        <button onClick={() => handleUpdate(user.id?user.id:1)}>עדכן</button>
                        <button onClick={() => userDispatch({ type: 'DELETE_USER', id: user.id?user.id:1 })}>delete</button>  
                    </div>
                ))}
            </div>
        </>
    );
};

export default Users;
