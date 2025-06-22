
# import cv2
# import numpy as np
# import os
# from datetime import datetime
# import time
# import requests

# def load_known_faces(image_directory):
#     known_faces = []
#     face_names = []
    
#     face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

#     if not os.path.exists(image_directory):
#         print("Error: Image directory not found.")
#         return [], []

#     for student_name in os.listdir(image_directory):
#         student_path = os.path.join(image_directory, student_name)

#         if not os.path.isdir(student_path):  # Ensure it's a folder
#             continue

#         for image_name in os.listdir(student_path):
#             if not image_name.lower().endswith(('.png', '.jpg', '.jpeg')):
#                 continue

#             image_path = os.path.join(student_path, image_name)
#             print(f"Processing: {image_path}")

#             img = cv2.imread(image_path)
#             if img is None:
#                 print(f"Error: Could not load {image_path}")
#                 continue

#             gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#             faces = face_cascade.detectMultiScale(gray, 1.1, 4)

#             if len(faces) > 0:
#                 print(f"Found {len(faces)} faces in {image_name}")
#                 x, y, w, h = faces[0]
#                 face_roi = gray[y:y+h, x:x+w]
#                 face_roi = cv2.resize(face_roi, (128, 128))
                
#                 known_faces.append(face_roi)
#                 face_names.append(student_name)  # Associate all images with the student name
#                 print(f"Successfully processed face from {image_name}")
#             else:
#                 print(f"No faces found in {image_name}")
    
#     return known_faces, face_names

# def compare_faces(known_faces, current_face, threshold=0.5):
#     current_face = cv2.resize(current_face, (128, 128))
    
#     for known_face in known_faces:
#         result = cv2.matchTemplate(current_face, known_face, cv2.TM_CCOEFF_NORMED)
#         max_similarity = np.max(result)
        
#         if max_similarity >= threshold:
#             return True  # If any of the images match, return True
    
#     return False

# def mark_attendance(name, attendance_record):
#     if name in attendance_record:
#         return  

#     if not os.path.exists("Attendance.csv"):
#         with open("Attendance.csv", "w") as file:
#             file.write("Name,Timestamp\n")

#     with open("Attendance.csv", "a") as file:
#         now = datetime.now()
#         timestamp = now.strftime("%Y-%m-%d %H:%M:%S")
#         file.write(f"{name},{timestamp}\n")
#         attendance_record.add(name)
#         print(f"Attendance marked for {name}")

# def process_video_stream(video_url, known_faces, face_names):
#     face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
#     attendance_record = set()

#     while True:
#         try:
#             response = requests.get(video_url, timeout=5)
#             if response.status_code == 200:
#                 arr = np.frombuffer(response.content, np.uint8)
#                 frame = cv2.imdecode(arr, cv2.IMREAD_COLOR)

#                 if frame is None:
#                     print("Error: Could not decode frame.")
#                     continue

#                 gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
#                 faces = face_cascade.detectMultiScale(gray, 1.1, 4)

#                 for (x, y, w, h) in faces:
#                     face_roi = gray[y:y + h, x:x + w]
#                     face_roi = cv2.resize(face_roi, (128, 128))

#                     best_match = "Unknown"
#                     for i, known_face in enumerate(known_faces):
#                         if compare_faces([known_face], face_roi):
#                             best_match = face_names[i]
#                             break

#                     if best_match != "Unknown":
#                         mark_attendance(best_match, attendance_record)

#                     cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
#                     cv2.putText(frame, best_match, (x, y - 10),
#                                 cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 255, 0), 2)

#                 cv2.imshow('Face Recognition', frame)

#                 if cv2.waitKey(1) & 0xFF == ord('q'):
#                     print("Exiting video stream.")
#                     break
#             else:
#                 print(f"Error fetching frame: {response.status_code}")
#         except Exception as e:
#             print(f"Error during video processing: {str(e)}")
#             print("Retrying connection...")
#             time.sleep(2)

#     cv2.destroyAllWindows()

# def main():
#     script_dir = os.path.dirname(os.path.abspath(__file__))
#     image_directory = os.path.join(script_dir, "ImagesBasic")
#     print(f"Looking for images in: {image_directory}")
#     video_url = "http://192.168.239.170/cam-hi.jpg"
#     known_faces, face_names = load_known_faces(image_directory)

#     if not known_faces:
#         print("No faces loaded. Exiting...")
#         return

#     print("Starting video stream...")
#     process_video_stream(video_url, known_faces, face_names)

# if __name__ == "__main__":
#     main()

























import cv2
import numpy as np
import os
from datetime import datetime
import time
import requests

def load_known_faces(image_directory):
    known_faces = []
    face_names = []
    
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

    if not os.path.exists(image_directory):
        print("Error: Image directory not found.")
        return [], []

    for student_name in os.listdir(image_directory):
        student_path = os.path.join(image_directory, student_name)

        if not os.path.isdir(student_path):  # Ensure it's a folder
            continue

        for image_name in os.listdir(student_path):
            if not image_name.lower().endswith(('.png', '.jpg', '.jpeg')):
                continue

            image_path = os.path.join(student_path, image_name)
            print(f"Processing: {image_path}")

            img = cv2.imread(image_path)
            if img is None:
                print(f"Error: Could not load {image_path}")
                continue

            gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
            faces = face_cascade.detectMultiScale(gray, 1.1, 4)

            if len(faces) > 0:
                print(f"Found {len(faces)} faces in {image_name}")
                x, y, w, h = faces[0]
                face_roi = gray[y:y+h, x:x+w]
                face_roi = cv2.resize(face_roi, (128, 128))
                
                known_faces.append(face_roi)
                face_names.append(student_name)
                print(f"Successfully processed face from {image_name}")
            else:
                print(f"No faces found in {image_name}")
    
    return known_faces, face_names

def compare_faces(known_faces, current_face, threshold=0.5):
    current_face = cv2.resize(current_face, (128, 128))
    
    for known_face in known_faces:
        result = cv2.matchTemplate(current_face, known_face, cv2.TM_CCOEFF_NORMED)
        max_similarity = np.max(result)
        
        if max_similarity >= threshold:
            return True
    
    return False

def mark_attendance(name, attendance_record):
    if name in attendance_record:
        return  

    if not os.path.exists("Attendance.csv"):
        with open("Attendance.csv", "w") as file:
            file.write("Name,Timestamp\n")

    with open("Attendance.csv", "a") as file:
        now = datetime.now()
        timestamp = now.strftime("%d-%m-%y %H:%M:%S")  # Changed format to DD-MM-YY
        file.write(f"{name},{timestamp}\n")
        attendance_record.add(name)
        print(f"Attendance marked for {name}")

def process_video_stream(video_url, known_faces, face_names):
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    attendance_record = set()

    while True:
        try:
            response = requests.get(video_url, timeout=5)
            if response.status_code == 200:
                arr = np.frombuffer(response.content, np.uint8)
                frame = cv2.imdecode(arr, cv2.IMREAD_COLOR)

                if frame is None:
                    print("Error: Could not decode frame.")
                    continue

                gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
                faces = face_cascade.detectMultiScale(gray, 1.1, 4)

                for (x, y, w, h) in faces:
                    face_roi = gray[y:y + h, x:x + w]
                    face_roi = cv2.resize(face_roi, (128, 128))

                    best_match = "Unknown"
                    for i, known_face in enumerate(known_faces):
                        if compare_faces([known_face], face_roi):
                            best_match = face_names[i]
                            break

                    if best_match != "Unknown":
                        mark_attendance(best_match, attendance_record)

                    cv2.rectangle(frame, (x, y), (x + w, y + h), (0, 255, 0), 2)
                    cv2.putText(frame, best_match, (x, y - 10),
                                cv2.FONT_HERSHEY_SIMPLEX, 0.75, (0, 255, 0), 2)

                cv2.imshow('Face Recognition', frame)

                if cv2.waitKey(1) & 0xFF == ord('q'):
                    print("Exiting video stream.")
                    break
            else:
                print(f"Error fetching frame: {response.status_code}")
        except Exception as e:
            print(f"Error during video processing: {str(e)}")
            print("Retrying connection...")
            time.sleep(2)

    cv2.destroyAllWindows()

def main():
    script_dir = os.path.dirname(os.path.abspath(__file__))
    image_directory = os.path.join(script_dir, "ImagesBasic")
    print(f"Looking for images in: {image_directory}")
    video_url = "http://192.168.86.170/cam-hi.jpg" 
    known_faces, face_names = load_known_faces(image_directory)

    if not known_faces:
        print("No faces loaded. Exiting...")
        return

    print("Starting video stream...")
    process_video_stream(video_url, known_faces, face_names)

if __name__ == "__main__":
    main()
