import { useReducer, useState, useParams } from "react";
import { ACTION_TYPE } from "./types";
import { UserReducer, user_initial } from "./reducer";
import { postData, uploadImage } from "./services/http";

function Left(){
    const {client} = useParams()
    const [password, setPassword] = useState()
    const [state, dispatch] = useReducer(UserReducer, user_initial)

    function handleChange(e){
        dispatch({
            type:ACTION_TYPE.USER_FIELD,
            payload: {name: e.target.name, value: e.target.value, "client":client}
        })
    }

    async function handleImage(e){
        const file = e.target.files[0]
        uploadImage(file)
        .then((resp) => {
            dispatch({
                type:ACTION_TYPE.USER_FIELD,
                payload:{name:e.target.name, value: resp}
            })
        })
    }

    function handlePassword(e){
        const password2 = e.target.value
        if (password === password2) {
            dispatch({
                type:ACTION_TYPE.USER_FIELD,
                payload:{name:'password', value:password}
            })
        } else {
            dispatch({
                type:ACTION_TYPE.USER_ERROR,
                payload:{msg:"password does not match"}
            })
        }
    }

    function submit(e){
        e.preventDefault()
        
        dispatch({type:ACTION_TYPE.USER_START})
        postData('/website/create/'+client, state.data)
        .then((resp) => {
            console.log(resp)
            if (resp.success){
                dispatch({
                    type:ACTION_TYPE.USER_SUCCESS
                })
                window.location.href = "https://madeyinka007.github.io/success/"           
            } else {
                dispatch({
                    type:ACTION_TYPE.USER_ERROR,
                    payload:{msg:resp.message}
                })
            }
        })
        .catch((err) => {
            dispatch({
                type:ACTION_TYPE.USER_ERROR,
                payload:err.message
            })
        })
    }

    return (
        <>
            <div class="col-xl-8 col-lg-8 content-right" id="start">
                <div id="wizard_container">
                    <div id="top-wizard">
	                    <span id="location"></span>
	                    <div id="progressbar"></div>
	                </div>
                    <form id="wrapped" onSubmit={submit} enctype="multipart/form-data">
                        <input id="website" name="website" type="text" value="" />
                        <div id="middle-wizard">
                            <div class="step">
	                            <h2 class="section_title">Business Profile</h2>
	                            <div class="form-group add_top_30">
	                                <input type="text" name="company" class="form-control required" placeholder="Company Name" onChange={handleChange} />
	                            </div>
	                            <div class="form-group">
	                                <input type="email" name="admin_email" class="form-control required" placeholder="Administrative Email Address" onChange={handleChange} />
	                            </div>
	                            <div class="form-group">
	                                <input type="text" name="phone" placeholder="Phone Number" class="form-control required" onChange={handleChange} />
	                            </div>
                                <div class="form-group">
	                                <input type="text" name="address" placeholder="Company Address" class="form-control required" onChange={handleChange} />
	                            </div>
                                <div class="row">
                                    <div class="form-group col-md-6">
                                        <input type="text" name="city" placeholder="City" class="form-control required" onChange={handleChange} />
                                    </div> 
                                    <div class="form-group col-md-6">
                                        <input type="text" name="state" placeholder="State" class="form-control required" onChange={handleChange} />
                                    </div>   
                                </div>
                                <div class="row">
                                    <div class="form-group col-md-6">
                                        <input type="password" name="password" placeholder="Password" class="form-control required" onChange={(e) => setPassword(e.target.value)} />
                                    </div> 
                                    <div class="form-group col-md-6">
                                        <input type="password" name="cpassword" placeholder="Confirm Password" class="form-control required" onChange={handlePassword} />
                                    </div>   
                                </div>
	                        </div>
                            <div class="step">
                                <h2 class="section_title">Website Information</h2>

								<div class="form-group radio_input add_top_30">
                                    <label class="container_radio version_2">Create a new domain for me.
	                                    <input type="radio" name="domain_state" value="New" class="required" onChange={handleChange} />
	                                    <span class="checkmark"></span>
	                                </label>
								    <label class="container_radio version_2">I already have a domain name.
	                                    <input type="radio" name="domain_state" value="Existing" class="required" onChange={handleChange} />
	                                    <span class="checkmark"></span>
	                                </label>
								</div>
                                <div class="form-group">
	                                <input type="text" name="domain_name" class="form-control required" placeholder="Domain Name" onChange={handleChange} />
	                            </div>
                                <div class="form-group">
	                                <input type="text" name="tagline" placeholder="Company Tagline" class="form-control" onChange={handleChange} />
	                            </div>
                                <div class="form-group add_bottom_30 add_top_20">
	                                <label>Company Logo <small>(File accepted: .jpg, .jpeg, .png, .svg - max file size: 150KB)</small></label>
	                                <div class="fileupload">
	                                    <input type="file" name="logo" accept=".jpg, .jpeg, .png, .svg" onChange={handleImage} />
	                                </div>
	                            </div>
                            </div>
                            <div class="step">
                                <h2 class="section_title">Website Content</h2>
                                
                                <div class="form-group add_bottom_30 add_top_20">
	                                <label>Content <small>(File accepted: .pdf, .doc/docx - Max file size: 150KB)</small></label>
	                                <div class="fileupload">
	                                    <input type="file" name="content" accept=".pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleImage} />
	                                </div>
	                            </div>
                                <div class="form-group">
                                    <label for="">Business Description</label>
                                    <textarea class="form-control" name="overview" rows="5" cols="40" onChange={handleChange}></textarea>
                                </div>
                            </div>
                            <div class="submit step" id="end">
                                <h2 class="section_title">Additional Info</h2>

                                <label class="custom radio_input add_top_30">Would you require our digital marketing services?</label>
	                                <div class="form-group radio_input">
	                                    <label class="container_radio me-3">Yes
	                                        <input type="radio" name="digital_service" value="Yes" onChange={handleChange} />
	                                        <span class="checkmark"></span>
	                                    </label>
	                                    <label class="container_radio">No
	                                        <input type="radio" name="digital_service" value="No" onChange={handleChange} />
	                                        <span class="checkmark"></span>
	                                    </label>
	                                </div>
                                <div class="form-group">
                                    <label for="">Note</label>
                                    <textarea class="form-control" name="note" rows="5" cols="40" onChange={handleChange}></textarea>
                                </div>
                                <div class="text-center">
	                                <div class="form-group terms">
	                                    <label class="container_check">Please accept our <a href="#" data-bs-toggle="modal" data-bs-target="#terms-txt">Terms and conditions</a> to continue
	                                        <input type="checkbox" name="terms" value="Yes" class="required" />
	                                        <span class="checkmark"></span>
	                                    </label>
	                                </div>
	                            </div>
                            </div>
                            {state.error && <div class="error-class">
                                <ul>
                                    <li><span>*</span> {state.msg}</li>
                                </ul>
                            </div>}
                        </div>
                        <div id="bottom-wizard">
	                        <button type="button" name="backward" class="backward">Prev</button>
	                        <button type="button" name="forward" class="forward">Next</button>
	                        <button type="submit" name="process" class="submit">{state.loading ? 'Sending...':'Submit'}</button>
	                    </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Left;