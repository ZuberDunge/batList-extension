import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "react-hook-form";
import App from "../App";
export default function Login() {

    const { userExist, passVisible, wrongPassword, setPassVisible, newUser, setNewUser, loginEmail, setLoginEmail,
        loginPassword, loginAsGuest, user, setRememberMe, login, registerUser } = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const signUpUser = (data) => {
        registerUser(data.userName, data.registerEmail, data.registerPassword)
    };

    const signInUser = (data) => {
        login(data.userEmail, data.userPassword)
    };
    console.log(user, !user);

    return (<>
        {
            !user ? (newUser ?
                <>  <div class="bat-login-form">
                    <h3 class=" bat-txt-center">Hey there 👋🏻</h3>

                    <form onSubmit={handleSubmit(signUpUser)}>
                        <div class="input-parent">
                            {/* <input type="text" required onChange={(event) => {
                        setuserName(event.target.value);
                    }} /> */}
                            <label for="name">Enter your name </label>
                            <input
                                {...register("userName", {
                                    required: true,
                                    minLength: 2,
                                    pattern: /^[A-Za-z]+$/i
                                })}
                            />
                            {errors?.userName?.type === "required" && <span><i class="fas fa-exclamation-triangle"></i> This field is required</span>}
                            {errors?.userName?.type === "miLength" && (
                                <span><i class="fas fa-exclamation-triangle"></i> name should be atleast 2 characters</span>
                            )}

                            {errors?.userName?.type === "pattern" && (
                                <span> <i class="fas fa-exclamation-triangle"></i> Alphabetical characters only</span>
                            )}


                        </div>


                        <div class="input-parent">
                            {/* <input type="text" required onChange={(event) => {
                        setRegisterEmail(event.target.value);
                    }} /> */}
                            <label for="email">Enter your email </label>
                            <input
                                {...register("registerEmail", {
                                    required: true,
                                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                })}
                            />
                            {errors?.registerEmail?.type === "pattern" && <span><i class="fas fa-exclamation-triangle"></i> Enter valid Email</span>}
                            {errors?.registerEmail?.type === "required" && <span><i class="fas fa-exclamation-triangle"></i> This field is required</span>}



                        </div>

                        <div class="input-parent">
                            <label for="Password">Enter Password </label>
                            {/* <input type={passVisible ? "password" : "text"} required
                        onChange={(event) => {
                            setRegisterPassword(event.target.value);
                        }} /> */}
                            <input type={passVisible ? "password" : "text"} {...register("registerPassword", { minLength: 6, required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/ })} />
                            <div onClick={() => setPassVisible(!passVisible)}
                                class={`pointer hide-pass-icon text-color-grey fas ${passVisible ? "fa-eye-slash" : "fa-eye"}`}></div>
                        </div>
                        {errors.registerPassword && (
                            <span><i class="fas fa-exclamation-triangle"></i> Password must be at least 6 digit contain number and alphabets</span>
                        )}
                        {errors?.registerPassword?.type === "required" && <span></span>}




                        {/* <p class="small-text">
                    By continuing, your agree to BatStore's Terms of Use and Privacy
                    Policy.
                </p> */}
                        <button class="bat-btn plcae-order-btn bat-br-3px bat-btn-primary">
                            Sign Up
                        </button>
                    </form>
                    <div class="bat-fs-1r bat-txt-center margin-t-1 bat-pad-tb-1 ">
                        Already a member?
                        <span class="text-color-primary pointer bat-fw-700" onClick={() => setNewUser(false)}> Log In! </span>
                    </div>
                    <button class="bat-btn bat-br-3px bat-btn-primary-outlined bat-fs-14px" style={{ color: "white" }} onClick={loginAsGuest}> Sign in as Guest</button>





                </div>

                </>
                :

                <>    <div class="bat-login-form">
                    <h3 class="bat-m-tb-1r bat-txt-center ">Welcome Back 👋🏻</h3>
                    <form onSubmit={handleSubmit(signInUser)}>
                        <div class="input-parent">
                            {/* <input type="text" value={loginEmail} required onChange={(event) => {
                        setLoginEmail(event.target.value);
                    }} />
                    <label for="email">Enter your email </label> */}

                            <label for="email">Enter your email </label>
                            <input defaultValue={loginEmail}
                                {...register("userEmail", {
                                    required: true,
                                    pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                })}
                            />
                            {errors?.userEmail?.type === "pattern" && <span> <i class="fas fa-exclamation-triangle"></i> Enter valid Email</span>}
                            {errors?.userEmail?.type === "required" && <span><i class="fas fa-exclamation-triangle"></i> This field is required</span>}



                        </div>

                        <div class="input-parent">
                            {/* <input required value={loginPassword}
                        type={passVisible ? "password" : "text"}
                        onChange={(event) => {
                            setLoginPassword(event.target.value);
                        }} /> */}
                            <label for="Password">Enter Password </label>
                            <input defaultValue={loginPassword} type={passVisible ? "password" : "text"} {...register("userPassword", { minLength: 6, required: true, pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/ })} />
                            <div onClick={() => setPassVisible(!passVisible)} class={`pointer hide-pass-icon text-color-grey fas ${passVisible ? "fa-eye-slash" : "fa-eye"}`}></div>
                            {errors.userPassword && (
                                <span><i class="fas fa-exclamation-triangle"></i> Password must be at least 6 digit</span>
                            )}
                            {errors?.userPassword?.type === "required" && <span></span>}

                        </div>
                        <p class="small-text">
                            <input type="checkbox" onClick={(e) => {
                                setRememberMe(e.target.checked);
                            }} /> Remember me.
                        </p>
                        <button class="bat-btn plcae-order-btn bat-br-3px bat-btn-primary">
                            Log In
                        </button>
                    </form>
                    <div class="bat-fs-1r bat-txt-center margin-t-1 bat-pad-tb-1 ">
                        new here?            <span class="text-color-primary bat-fw-700 pointer" onClick={() => setNewUser(true)}> Sign Up! </span>
                    </div>
                    <button class="bat-btn bat-br-3px bat-btn-primary-outlined bat-fs-14px" style={{ color: "white" }} onClick={loginAsGuest}>Sign in as Guest</button>
                </div>
                </>)
                : <App />}

        {wrongPassword ? <div class="bat-alert bat-alert-warning bat-fs-14px ">
            <i class="fas fa-exclamation-triangle"></i> Invalid Password or Email!
        </div> : null}
        {userExist ? <div class="bat-alert bat-alert-warning bat-fs-14px ">
            <i class="fas fa-exclamation-triangle"></i> User Already exist!
        </div> : null}
    </>)
}