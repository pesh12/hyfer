import React from 'react';
import store from '../../store/UserStore';
import styles from '../../assets/styles/profile.css';
import { Link } from 'react-router-dom';
import Notifications, {notify} from 'react-notify-toast';


export default class Profile extends React.Component {

  componentWillMount = () => {
    this.subscription = store.subscribe(state => {
      this.setState(state);
    });
  }

  setInputActive = (e) => {
    e.target.parentElement.className += ' ' + styles.isActive
    e.target.parentElement.className += ' ' + styles.isCompleted
  }

  componentWillUnmount() {
    this.subscription.remove();
  }

  checkHasValue (val) {
    console.log(val)
    return (!val || val.length === 0) ? '' : styles.isCompleted;
  }

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  saveProfile = () => {

    const updatedUser = {
      "id": store.state.id,
      "username": store.state.username,
      "full_name": store.state.full_name,
      "group_name": store.state.group_name,
      "role": store.state.role,
      "register_date": store.state.register_date,
      "email": store.state.email,
      "slack_username": store.state.slack_username,
      "freecodecamp_username": store.state.freecodecamp_username,
      "mobile": store.state.mobile,
      "group_id": store.state.group_id
    }

    fetch(`http://localhost:3005/api/user/${store.state.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUser), 
    })
      .then(response => console.log("RESPONSE", response))
      .then(notify.show('Toasty!'))
      .catch((error) => {
        console.log(error)
        throw new Error('Problem with Server :  PATCH DATA')
    })  
  }

  resetProfile = () => {
    store.setState({
      id: store.state.reset_id,
		  username:store.state.reset_username,
      full_name: store.state.reset_full_name,
      group_name: store.state.reset_group_name,
      role: store.state.reset_role,
      register_date: store.state.reset_register_date,
      email: store.state.reset_email,
      slack_username: store.state.reset_slack_username,
      freecodecamp_username: store.state.reset_freecodecamp_username,
      mobile: store.state.reset_mobile,
      group_id: store.state.reset_group_id
    })
  }

  render(){
      return (
      
      <div className={styles.profilePage}>
          <Notifications />
          <Link to='/users'>
              <input className={styles.backButton} 
                     type="button" 
                     value="&#8249;" 
                      />
          </Link> 
          <h1>Edit Profile</h1>
          <div className={styles.profileContainer}>
            <div className={styles.matDiv + ' ' + this.checkHasValue(store.state.full_name)}>
              <label for="first-name" className={styles.matLabel}>First Name</label>
              <input className={styles.matInput} 
                    type="text" value={store.state.full_name} 
                    id="first-name"
                    onChange={(e)=> {store.setState({full_name: e.target.value});}}
                    onFocus = {(e) => {this.setInputActive(e)}}
                    />
            </div>

            <div className={styles.small + ' ' + styles.matDiv + ' ' + styles.isCompleted}>
              <label for="role" className={styles.matLabel}>Role</label>
              <select value={store.state.role}
                      id="role" 
                      className={styles.matInput}
                      onChange={(e)=> {store.setState({role: e.target.value});}}
                      >
                <option value="guest" disabled hidden>Role</option>
                <option value="teacher">Teacher</option>
                <option value="student">Student</option>
              </select>
            </div>
            
            <div className={styles.small + ' ' + styles.matDiv + ' ' + styles.isCompleted}>
              <label for="Class" className={styles.matLabel}>Class</label>
              <select   className={styles.matInput} value = {'{"name":"'+store.state.group_name+'","id":"'+store.state.group_id+'"}'}
                        onChange={(e)=> {store.setState({group_name: JSON.parse(e.target.value).name, group_id: +JSON.parse(e.target.value).id});
              }}>
                <option value='{"name":"Class 6","id":"44"}'>Class 6</option>
                <option value='{"name":"Class 7","id":"45"}'>Class 7</option>
                <option value='{"name":"Class 8","id":"46"}'>Class 8</option>
                <option value='{"name":"Class 9","id":"47"}'>Class 9</option>
                <option value='{"name":"Class 10","id":"48"}'>Class 10</option>
                <option value='{"name":"Class 11","id":"49"}'>Class 11</option>
                <option value='{"name":"Class 12","id":"50"}'>Class 12</option>
                <option value='{"name":"Class 13","id":"51"}'>Class 13</option>
                <option value='{"name":"Class 14","id":"52"}'>Class 14</option>
                <option value='{"name":"Class 15","id":"53"}'>Class 15</option>
              </select>
            </div>
            <div className={styles.matDiv+ ' ' + this.checkHasValue(store.state.email)}>
              <label for="e-mail" className={styles.matLabel}>e-mail</label>  
              <input type="email"
                      className={styles.matInput} 
                      value={store.state.email}
                      id="e-mail" 
                      onChange={(e)=> {store.setState({email: e.target.value});}}
                      onFocus = {(e) => {this.setInputActive(e)}}/>
            </div>    
            <div className={styles.matDiv+ ' ' + this.checkHasValue(store.state.slack_username)}>
              <label for="slack-username" className={styles.matLabel}>Slack Username</label>      
              <input type="text" 
                      value={store.state.slack_username}
                      className={styles.matInput}  
                      id="slack-username" 
                      onChange={(e)=> {store.setState({slack_username: e.target.value});}} 
                      onFocus = {(e) => {this.setInputActive(e)}}
                      />
            </div>
            <div className={styles.matDiv + ' ' + this.checkHasValue(store.state.freecodecamp_username)}>
              <label for="freecodecamp-username" className={styles.matLabel}>FreeCodeCamp Username</label>           
              <input type="text" 
                      value={store.state.freecodecamp_username} 
                      className={styles.matInput}
                      id="freecodecamp-username"
                      onChange={(e)=> {store.setState({freecodecamp_username: e.target.value});}}
                      onFocus = {(e) => {this.setInputActive(e)}}
                      />
            </div>  
            <div className={styles.matDiv + ' ' + this.checkHasValue(store.state.mobile)}>
              <label for="mobile" className={styles.matLabel}>Mobile</label>        
              <input type="tel" 
                      value={store.state.mobile}
                      className={styles.matInput} 
                      id="mobile" 
                      onChange={(e)=> {store.setState({mobile: e.target.value});}}
                      onFocus = {(e) => {this.setInputActive(e)}}
                      />
            </div>           

            <Link to='/users'>
              <input className={styles.saveProfile} 
                      type="submit" 
                      value="Save" 
                      onClick={this.saveProfile}
                      />
            </Link>    

            <input className={styles.resetProfile} 
                    type="reset" 
                    value="Reset"
                    onClick={this.resetProfile} 
                    />                        
          </div>
          
      </div>    
      )
  }
}