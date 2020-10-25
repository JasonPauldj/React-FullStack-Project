import React, { Component } from 'react';
import { Media, Card, CardImg, CardImgOverlay, CardBody, CardText, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Jumbotron, FormFeedback, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const nameLengthValid = (val) => val && (val.length >= 3 && val.length <= 15)

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            rating: '1',
            username: '',
            comment: ''
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmitComment() {
        this.toggleModal();
        /*
        alert('Comment is' + JSON.stringify(this.state);
        console.log("Comments is " + JSON.stringify(this.state))*/

        alert('Comment details ' + this.rate.value + ' ' + this.comment.value + ' ' + this.name.value)
    }

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    validate(username) {

        if (username.length < 3 || username.length > 15)
            return 'the Name must be at least 3 characrers and less than 15 characters.';
        else
            return ''
    }

    handleSubmit(values) {
        alert('Current State is: ' + JSON.stringify(values))
    }

    render() {
        //const error = this.validate(this.state.username);
        console.log('rendering');
        return (
            <>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        { /*--- Controlled Form---
                        <Form onSubmit={this.handleSubmitComment}>
                            <FormGroup >
                                <Label htmlFor="rating">
                                    Rating
                        </Label>
                                <Input type="select" name="rating"
                                    value={this.state.rating}
                                    onChange={this.handleInputChange}
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>

                                </Input>
                            </FormGroup>
                            <FormGroup >
                                <Label htmlFor="username">Username</Label>
                                <Input type="text" id="username" name="username" value={this.state.username}
                                    onChange={this.handleInputChange}
                                    valid={error === ''}
                                    invalid={error!== ''} />
                                    <FormFeedback>{error}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Input type="textarea" id="comment" name="comment" rows="6" value={this.state.comment}
                                    onChange={this.handleInputChange} />
                            </FormGroup>

                            <Button type="submit" value="submit" color="primary">Submit your Comment</Button>
        </Form>*/}

                        { /*                --- Uncontrolled Form---
                             <Form onSubmit={this.handleSubmitComment}>
                            <FormGroup >
                                <Label htmlFor="rating">
                                    Rating
                        </Label>
                                <Input type="select" name="rating"
                                   // innerRef={(input)=> this.rate=input }
                                >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>

                                </Input>
                            </FormGroup>
                            <FormGroup >
                                <Label htmlFor="username">Username</Label>
                               <Input type="text" id="username" name="username" innerRef={(input)=> this.name=input } />
                                <FormFeedback>{error}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Input type="textarea" id="comment" name="comment" rows="6" 
                                innerRef={(inp)=> this.comment=inp} />
                            </FormGroup>

                            <Button type="submit" value="submit" color="primary">Submit your Comment</Button>
                        </Form>
    */}
                        <div className="container"><div className="row">
                            <div className="col-12 col-md-9">
                                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                                    <Row className="form-group" >
                                        <Label md={2} htmlFor="rating">
                                            Rating
                                </Label>
                                        <Col md={12}>
                                            <Control.select model=".rate" type="select" name="rating" className="form-control"  >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                            </Control.select>
                                        </Col>
                                    </Row>

                                    <Row className="form-group" >
                                        <Label md={2} htmlFor="username">Username</Label>
                                        <Col md={12}>
                                            <Control.text model=".username" id="username" name="username" className="form-control"
                                                validators={{ nameLengthValid }}
                                            />
                                            <Errors 
                                            className="text-danger"
                                            model =".username"
                                            show="touched"
                                            messages={{
                                                nameLengthValid: 'The username should be greater than 2 characters and less than 15 characters'
                                            }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label md={2} htmlFor="comment">Comment</Label>
                                        <Col md={12}>
                                            <Control.textarea model=".comment" id="comment" name="comment" rows="6" className="form-control" />
                                        </Col>
                                    </Row>

                                    <Button type="submit" value="submit" color="primary">Submit your Comment</Button>
                                </LocalForm>
                            </div>
                        </div>
                        </div>
                    </ModalBody>
                </Modal>
                <Button onClick={this.toggleModal} >Submit Comment</Button>
            </>
        );
    }
}



class DishDetails extends Component {

    constructor(props) {
        super(props);
        /* this.state={
                    dish : null
         };*/
    }

    render() {

        if (this.props.dish != null) {
            const comments = this.props.comments.map((comment) => {
                return (
                    <div key={comment.id} >
                        <Media tag="li">
                            <Media body >
                                <Media heading>{comment.comment}</Media>
                                <p>-- {comment.author}  {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}</p>
                            </Media>
                        </Media>
                    </div>
                )
            });

            return (
                <div className="container">
                    <div className="row">

                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12"><h3>{this.props.dish.name}</h3></div>
                    </div>
                    <div className="row">
                        <div className="col-12 col-md-5 m-1">
                            <Card >
                                <CardImg width="100%" src={this.props.dish.image} alt={this.props.dish.name} />

                                <CardBody>
                                    <CardTitle className="mt-3">{this.props.dish.name}</CardTitle>
                                    <CardText>{this.props.dish.description}</CardText>
                                </CardBody>
                            </Card>

                        </div>

                        <div className="col-12 col-md-5 m-1">
                            <Media list width="100%">
                                <Media tag="li">
                                    <Media body >
                                        <Media heading>Comments</Media>
                                    </Media>
                                </Media>
                                {comments}
                            </Media>
                            <CommentForm />
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return <div></div>
        }

    }
}

export default DishDetails;