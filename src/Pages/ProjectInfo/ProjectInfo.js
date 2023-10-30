import React from 'react'
import './ProjectInfo.css'

const ProjectInfo = () => {
    return (
        <div className='ProjectInfo'>
            <h2>Project Info - List of the tasks Completed in this project</h2>
            <br></br>
            <div>
                <div>
                    <h5><u>Class : 28 -  React Day 8 </u></h5>
                    <ul>
                        <li>Product creation using formik with CRUD using mockapi</li>
                    </ul>
                </div>

                <div>
                    <h5><u>Class : 37 -  Authentication </u></h5>
                    <ul>
                        <li>Password Reset Flow</li>
                    </ul>
                </div>

                <div>
                    <h5><u>Class : 38 -  JWT </u></h5>
                    <ul>
                        <li>URL Shortener App</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ProjectInfo