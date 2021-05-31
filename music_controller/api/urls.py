from django.urls import path

from .views import RoomView, CreateRoomView, GetRoom, JoinRoom, UserInRoom,\
    UserLeaveRoom, UpdateRoom

app_name = 'api'

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create-room', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
    path('user-in-room', UserInRoom.as_view()),
    path('user-leave-room', UserLeaveRoom.as_view()),
    path('update-room', UpdateRoom.as_view())
]
