import React, { Component } from 'react'

class Staff extends Component {

    

    constructor(props){
        super(props);
       this.state = {
        currentUserName: '',
        currentUserEmail: '',
        tableData:[
            { "id":1,"name":"test1","age" : "11","gender":"male","email" : "test1@gmail.com","phoneNo" : "9415346313" },
            { "id":2,"name":"test2","age" : "12","gender":"male","email" : "test2@gmail.com","phoneNo" : "9415346314" },
            { "id":3,"name":"test3","age" : "13","gender":"male","email" : "test3@gmail.com","phoneNo" : "9415346315" }
            ]
    }
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
    }


    getKeys = function() {
        return Object.keys(this.state.tableData[0]);
    }

    getHeader = function() {
        var keys = this.getKeys();
        
        return keys.map((key,index)=>{
            return <th key={key}>{key.toUpperCase()}</th>
        })
    }

    getRowsData = function() {
        var items=this.state.tableData;
        
        var keys= this.getKeys();
        return items.map((row,index) => {
            return <tr key={index}><RenderRow key={index} data={row} keys={keys} /></tr>
        })
    }


    componentDidMount() {
        const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
        this.setState({
            currentUserEmail: idToken.idToken.claims.email,
            currentUserName: idToken.idToken.claims.name
        })
    }

    render() {
            const { currentUserEmail , currentUserName } = this.state;
        return (
            <div className="container">
                <div>
                <h1>Welcome { currentUserName }</h1>
                <p>Email: { currentUserEmail }</p>
                <p>You have reached the authorized staff area of the portal</p>
                </div>
                <div>
                <table>
                    <thead>
                        <tr>{this.getHeader()}</tr>
                    </thead>
                    <tbody>
                        {this.getRowsData()}
                    </tbody>
                </table>
            </div>
            </div>
            
        )
    }
}

const RenderRow = (props) => {
    
    return props.keys.map((key,index) => {
        return <td key={props.data[key]}>{props.data[key]}</td>
    })
}

export default Staff;

