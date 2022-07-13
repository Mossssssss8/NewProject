import sys
import os
import cv2
import numpy as np
import time
import mediapipe as mp
import matplotlib.pylab as plt

mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose
cap = cv2.VideoCapture(0)

from datetime import date, datetime

def DiamondAI(self):
        counter = 0
        min = int(0)
        Set = 0
        stage = None
        mp_drawing.DrawingSpec
        
        def calculate_angle(a,b,c):
            a = np.array(a) # First
            b = np.array(b) # Mid
            c = np.array(c) # End
        
            radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
            angle = np.abs(radians*180.0/np.pi)
        
            if angle >180.0:
                angle = 360-angle
            
            return angle
        
        ## Setup mediapipe instance
        with mp_pose.Pose(min_detection_confidence=0.5, min_tracking_confidence=0.5) as pose:
            start_time = datetime.now()
            diff = (datetime.now() - start_time).seconds
            while cap.isOpened():            
                ret, frame = cap.read()
                diff = (datetime.now() - start_time).seconds
                if diff > 50:
                    diff = 0 
                    min += 1
                    if diff == 0:
                        start_time = datetime.now()
                        diff = (datetime.now() - start_time).seconds
                # Recolor image to RGB
                image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                image.flags.writeable = False
        
                # Make detection
                results = pose.process(image)
        
                # Recolor back to BGR
                image.flags.writeable = True
                image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
            
                # Extract landmarkss
                try:
                    landmarks = results.pose_landmarks.landmark
                
                    # Get coordinates
                    shoulder = [landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,landmarks[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
                    elbow = [landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].x,landmarks[mp_pose.PoseLandmark.LEFT_ELBOW.value].y]
                    wrist = [landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].x,landmarks[mp_pose.PoseLandmark.LEFT_WRIST.value].y]
                
                    # Calculate angle
                    angle = calculate_angle(shoulder, elbow, wrist)
                
                    # Visualize angle
                    cv2.putText(image, str(angle), 
                           tuple(np.multiply(shoulder, [640, 480]).astype(int)), 
                           cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2, cv2.LINE_AA
                                )
                
                    # Curl counter logic
                    if angle > 160:
                        stage = "Down"
                    if angle < 40 and stage =='Down':
                        stage="Up"
                        counter +=1
                        if counter == 12 :
                            counter = 0
                            Set+=1  
                        print(counter)     
                except:
                    pass
            
                # Render curl counter
                # Setup status box
                cv2.rectangle(image, (0,0), (225,73), (143,216,231), -1)        
                cv2.rectangle(image, (800,0), (500,73), (143,216,231), -1)
                
                # Rep data
                cv2.putText(image, 'Reps', (15,18), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,0,0), 1, cv2.LINE_AA)
                cv2.putText(image, str(counter), 
                            (15,65), 
                            cv2.FONT_HERSHEY_SIMPLEX, 1.2, (245,163,52), 2, cv2.LINE_AA)
                #settime
                cv2.putText(image, 'Time', (550,18), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,0,0), 1, cv2.LINE_AA)
                cv2.putText(image, str(min), (545,65), 
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (65,145,225), 2, cv2.LINE_AA)
                cv2.putText(image, ':', (570,65), 
                            cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0,0,0), 1, cv2.LINE_AA)
                cv2.putText(image,str(diff), 
                            (585,65), 
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (65,145,225),2, cv2.LINE_AA)
                
                # Stage data 
                cv2.putText(image, 'Status', (110,18), 
                            cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0,0,0), 1, cv2.LINE_AA)
                cv2.putText(image, stage, 
                            (115,65), 
                            cv2.FONT_HERSHEY_SIMPLEX, 1, (134,219,37),2, cv2.LINE_AA)
                
                mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_pose.POSE_CONNECTIONS,
                                        mp_drawing.DrawingSpec(color=(245,117,66), thickness=2, circle_radius=2), 
                                        mp_drawing.DrawingSpec(color=(245,66,230), thickness=2, circle_radius=2) 
                                        )           
            
                cv2.imshow('Exercise : PUSH - UP', image)

                if cv2.waitKey(10) & 0xFF == 27:
                    self.ui.Reps.setText("Repetition : "+str(counter))
                    self.ui.Set.setText("Set : "+str(Set))
                    self.ui.Timer.setText("Timer : "+str(min)+":"+str(diff))
                    break      
            cv2.destroyAllWindows()
            