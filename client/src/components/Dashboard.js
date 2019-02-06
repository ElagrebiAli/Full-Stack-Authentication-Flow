import React,{Component} from 'react'


class Dashboard extends Component{
    async componentDidMount(){
        if(this.props.isAuth){
            await this.props.getSecret()
        }
       
    }
    render(){
        return (
            <>{
                this.props.isAuth?
                <div>
                <h1>Dashboard</h1>
                <h2>Your email:{this.props.email}</h2></div>:null
            }
            
            </>
        )
    }
}

  
  export default Dashboard