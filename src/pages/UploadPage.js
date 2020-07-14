import React, {useState} from 'react';
import '../App.css';
import axios from 'axios';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input, FormText, Card, CardImg, CardTitle} from 'reactstrap';

const UploadPage = ({jwt}) => {
  const [imageFile, setImageFile] = useState(null)
  const handleInput = (e) =>{
    setImageFile(e.target.files[0])
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
    setImageFile(e.target.files[0])
  }
  const [loading, setLoading] = useState(true)
  const handleUpload = (e) =>{
    e.preventDefault()
      // Formdata object to hold the image file to send to the server
      let formData = new FormData();
      // Append the key:value pair to the formData object
      formData.append("image", imageFile);
    axios.post("https://insta.nextacademy.com/api/v1/images/", formData, {
      headers: { Authorization: `Bearer ${jwt}` }
    })
    .then(response => {
      if (response.data.success) {
          setMessage("Image Uploaded Successfully!")
          setPreviewImage(null)
          setImageFile(null)
      }
    })
    .catch(error => {
      console.log(error.response);
    });
  }
  
  const [previewImage, setPreviewImage] = useState(null)
  const [message, setMessage] = useState('')
    return(
      <>
      <div className="container d-flex flex-column">
        <Card className="container w-50 bg-light d-flex justify-content-center align-items-center" style={{width:"70%"}}>
          {previewImage ? (<CardImg top src={previewImage} alt="preview"/>) : (
            <CardTitle style={{height:"500px"}} className="d-flex justify-content-center align-items-center">
              {message ? message : "Live Preview"}
            </CardTitle>
          )}
        </Card>
        <Form onSubmit={handleUpload} className="d-flex flex-column align-items-center">
          <FormGroup className="d-flex flex-column align-items-center">
            <Input style={{width:"70%"}} type="file" name="image-file" onChange={handleInput}/>
            <FormText color="muted">Make sure the image being uploaded is a supported format.</FormText>
          </FormGroup>
          <Button type="submit" color="primary" disabled={imageFile == null ? true : false}>
            Upload
          </Button>
        </Form>
      </div>
      </>
    )
}

export default UploadPage;