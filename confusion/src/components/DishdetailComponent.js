import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishdetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dish: this.props.dish
        }
    }

    renderDish(dish) {
        if (dish != null) {
            return(
                    <Card>
                        <CardImg width="100%" object src={dish.image} alt={dish.name}></CardImg>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
            );
        }
        else {
            return(
                <div></div>
            );
        }
    }

    renderComment(comments) {
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
                <div>
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
                  <div>
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


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.dish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.props.dish && this.renderComment(this.props.dish.comments)}
                    </div>
                </div>
            </div>
            
        )
    }
}

export default DishdetailComponent