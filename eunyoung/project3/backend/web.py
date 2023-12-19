# # app.py
# import socketio
# from flask import Flask, render_template
# import base64
# import cv2
# from flask_cors import CORS
#
# app = Flask(__name__)
# CORS(app)
#
# # 웹캠 연결
# @socketio.on('start_webcam', namespace='/webcam')
# def handle_connect():
#     print('Webcam connected')
#
# # 웹캠 중지
# @socketio.on('stop_webcam', namespace='/webcam')
# def stop_webcam():
#     # 여기에 웹캠 중지 로직 추가
#     pass
#
# # 웹캠 프레임 전송
# def send_frame(frame):
#     encoded_frame = base64.b64encode(frame).decode('utf-8')
#     socketio.emit('frame', {'image': encoded_frame}, namespace='/webcam')
#
# # 웹캠 쓰레드
# def webcam_thread():
#     try:
#         # Open a connection to the webcam (camera index 0 by default)
#         cap = cv2.VideoCapture(0)
#
#         # Check if the webcam is opened successfully
#         if not cap.isOpened():
#             print("Error: Could not open webcam.")
#             return
#
#         while True:
#             # Read a frame from the webcam
#             ret, frame = cap.read()
#
#             # Check if the frame is read successfully
#             if not ret:
#                 print("Error: Failed to grab frame.")
#                 break
#
#             # Resize the frame to reduce network load
#             resized_frame = cv2.resize(frame, (640, 480))
#
#             # Send the frame to connected clients
#             send_frame(resized_frame)
#
#             # Display the frame in the window
#             cv2.imshow("Live Webcam Feed", frame)
#
#             # Break the loop if 'q' key is pressed
#             if cv2.waitKey(1) & 0xFF == ord('q'):
#                 break
#
#     finally:
#         # Release the webcam and close all windows
#         cap.release()
#         cv2.destroyAllWindows()
#         # Disconnect the socket
#         socketio.emit('disconnect', namespace='/webcam')
#
# # 웹캠 페이지 라우트
# @app.route('/webcamStream')
# def webcam_stream():
#     return render_template('webcamStream.html')
#
# if __name__ == '__main__':
#     # Start the Flask application
#     socketio.run(app, debug=True)
