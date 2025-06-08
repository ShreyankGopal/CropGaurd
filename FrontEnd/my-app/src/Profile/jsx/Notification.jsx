import React, { useEffect, useState } from 'react';
import { Bell, Check, CheckCheck,ArrowLeft } from 'lucide-react';
import '../css/NotificationsPage.css';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
const NotificationsPage = () => {
  const navigate=useNavigate()
    const fetchNotifications=async()=>{
        try{
            const results=await api.get('/notifications')
            console.log(results);
            setNotifications(results.data)
        }
        catch(error){
            console.log(error);
        }
       
    }
    useEffect(()=>{
        fetchNotifications()
    },[])
    const [notifications,setNotifications]=useState([])
  // const [notifications, setNotifications] = useState([
  //   {
  //     id: 1,
  //     questionTitle: 'Best fertilizer for tomato plants?',
  //     replierName: 'Sarah Johnson',
  //     timestamp: '2 minutes ago',
  //     isRead: false
  //   },
  //   {
  //     id: 2,
  //     questionTitle: 'Dealing with corn borer infestation',
  //     replierName: 'Mike Davis',
  //     timestamp: '1 hour ago',
  //     isRead: false
  //   },
  //   {
  //     id: 3,
  //     questionTitle: 'Irrigation scheduling for wheat',
  //     replierName: 'Emma Wilson',
  //     timestamp: '3 hours ago',
  //     isRead: true
  //   },
  //   {
  //     id: 4,
  //     questionTitle: 'Best fertilizer for tomato plants?',
  //     replierName: 'James Brown',
  //     timestamp: '5 hours ago',
  //     isRead: false
  //   },
  //   {
  //     id: 5,
  //     questionTitle: 'Soil pH testing methods',
  //     replierName: 'Lisa Garcia',
  //     timestamp: '1 day ago',
  //     isRead: true
  //   },
  //   {
  //     id: 6,
  //     questionTitle: 'Organic pest control for vegetables',
  //     replierName: 'Robert Lee',
  //     timestamp: '2 days ago',
  //     isRead: false
  //   },
  //   {
  //     id: 7,
  //     questionTitle: 'Crop rotation benefits',
  //     replierName: 'Anna Martinez',
  //     timestamp: '3 days ago',
  //     isRead: true
  //   },
  //   {
  //     id: 8,
  //     questionTitle: 'Dealing with corn borer infestation',
  //     replierName: 'Tom Anderson',
  //     timestamp: '4 days ago',
  //     isRead: false
  //   }
  // ]);

  const markAsRead = async(id) => {
    setNotifications(notifications.map(notification =>
      notification._id === id ? { ...notification, read: true } : notification
    ));
    try{
      const response=await api.post('/readNotifications',{id:id,all:0})
      console.log(response.data)
    }
    catch(error){
      console.log(error)
    }
    

  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-container">
      {/* Header */}
      <div className="notifications-header">
        <div className="header-content">
          <div className="header-left">
            <button className="back-button" onClick={() => navigate('/')}>
              <ArrowLeft className="icon" size={20} />
              Back To Home
            </button>
            <div className="header-title">
              <Bell className="bell-icon" />
              <h1>Notifications</h1>
              {unreadCount > 0 && (
                <span className="unread-badge">{unreadCount}</span>
              )}
            </div>
          </div>
          {unreadCount > 0 && (
            <button className="mark-all-btn" onClick={markAllAsRead}>
              <CheckCheck size={18} />
              Mark All as Read
            </button>
          )}
        </div>
      </div>
  
      {/* Notifications List */}
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="empty-state">
            <Bell className="empty-icon" />
            <h3>No notifications yet</h3>
            <p>You'll see notifications here when someone replies to your questions.</p>
          </div>
        ) : (
          notifications.map(notification => (
            <div
              key={notification.id}
              className={`notification-item ${!notification.isRead ? 'unread' : ''}`}
            >
              <div className="notification-content">
                <div className="notification-text">
                  <span className="replier-name">{notification.replyBy.name}</span>
                  <span className="action-text">replied to</span>
                  <span className="question-title">"{notification.Question.Title}"</span>
                </div>
                <div className="notification-time">{new Date(notification.Date).toLocaleString()}</div>
              </div>
                             
              {!notification.read && (
                <button
                  className="mark-read-btn"
                  onClick={() => markAsRead(notification._id)}
                  title="Mark as read"
                >
                  <Check size={16} />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;