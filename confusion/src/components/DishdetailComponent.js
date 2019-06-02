import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

    function RenderDish({dish}) {
        if (dish != null) {
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg width="100%" object src={dish.image} alt={dish.name}></CardImg>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                    
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }

    function RenderComment({comments}) {
        if (comments != null) {
            const commentList = comments.map(comment => {
            const options = {
                year: "numeric",
                month: "short",
                day: "2-digit"
            };
            const formattedDate = new Date(comment.date).toLocaleDateString(
                "en-US",
                options
            );
          
            return (
                <div >
                    <ul key={comment.id} className="list-unstyled">
                        <li>{comment.comment}</li>
                        <li>
                          -- {comment.author}, {formattedDate}
                        </li>
                      </ul>
                    </div>
                  );
                });
                return (
                  <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {commentList}
                  </div>
                );
            }
        else {
            return (
                <div></div>
            );
        }
    }


    const DishDetail = (props) => {
        if (props.dish != null) {
            return (
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="row">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish} /> 
                        <RenderComment comments={props.comments} />
                    </div>
                </div>
            )
        }
        else {
            return (
                <div></div>
            )
        }
    }

export default DishDetail