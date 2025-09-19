import React, { createContext, useContext, useState, useEffect } from 'react';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  'en': {
    // Navigation
    'patient_portal': 'Patient Portal',
    'symptom_checker': 'Symptom Checker',
    'doctor_dashboard': 'Doctor Dashboard',
    'pharmacy': 'Pharmacy',
    'admin_panel': 'Admin Panel',
    'language_settings': 'Language Settings',
    
    // Patient Portal
    'next_appointment': 'Next Appointment',
    'tomorrow': 'Tomorrow',
    'health_score': 'Health Score',
    'good': 'Good',
    'active_prescriptions': 'Active Prescriptions',
    'current_medications': 'Current medications',
    'my_appointments': 'My Appointments',
    'upcoming_past_consultations': 'Upcoming and past consultations',
    'upcoming': 'Upcoming',
    'past': 'Past',
    'join_call': 'Join Call',
    'view_details': 'View Details',
    'view_notes': 'View Notes',
    'medical_records': 'Medical Records',
    'health_history_documents': 'Your health history and documents',
    'general_checkup': 'General Checkup',
    'medication_prescribed': 'Medication Prescribed',
    'blood_test_results': 'Blood Test Results',
    'routine_checkup_completed': 'Routine checkup completed. All vitals normal. Recommended follow-up in 6 months.',
    'amoxicillin_prescribed': 'Amoxicillin 500mg prescribed for minor infection. Take 3 times daily for 7 days.',
    'blood_test_normal': 'Complete blood count results within normal ranges. Cholesterol levels slightly elevated.',
    
    // Doctor Dashboard
    'todays_patients': "Today's Patients",
    'waiting': 'Waiting',
    'completed': 'Completed',
    'high_priority': 'High Priority',
    'patient_queue': 'Patient Queue',
    'manage_consultations': 'Manage your consultations and patient flow',
    'start_consultation': 'Start Consultation',
    'view_history': 'View History',
    'symptoms': 'Symptoms',
    'scheduled': 'Scheduled',
    'age': 'Age',
    'priority': 'priority',
    'high': 'high',
    'medium': 'medium',
    'low': 'low',
    
    // Pharmacy
    'pending': 'Pending',
    'ready': 'Ready',
    'low_stock': 'Low Stock',
    'total_items': 'Total Items',
    'e_prescriptions': 'E-Prescriptions',
    'manage_process_prescriptions': 'Manage and process prescriptions',
    'prescribed_by': 'Prescribed by',
    'qty': 'Qty',
    'in_stock': 'In Stock',
    'out_of_stock': 'Out of Stock',
    'process': 'Process',
    'mark_ready': 'Mark Ready',
    'inventory_management': 'Inventory Management',
    'track_medication_stock': 'Track medication stock and availability',
    'search_medications': 'Search Medications',
    'search_name_category': 'Search by name or category...',
    'expires': 'Expires',
    'stock': 'Stock',
    
    // Symptom Checker
    'ai_symptom_checker': 'AI Symptom Checker',
    'describe_symptoms': 'Describe your symptoms and get instant AI-powered health insights',
    'describe_symptoms_placeholder': 'Please describe your symptoms in detail...',
    'analyze_symptoms': 'Analyze Symptoms',
    'analyzing': 'Analyzing...',
    'health_insights': 'Health Insights',
    'based_on_symptoms': 'Based on your symptoms, here are some possible insights:',
    'disclaimer': 'Disclaimer: This is not a medical diagnosis. Please consult with a healthcare professional for proper medical advice.',
    'schedule_consultation': '• Schedule consultation with healthcare provider if symptoms worsen',
    
    // Admin Panel
    'system_overview': 'System Overview',
    'monitor_platform_performance': 'Monitor platform performance and user activity',
    'total_users': 'Total Users',
    'active_sessions': 'Active Sessions',
    'appointments_today': 'Appointments Today',
    'system_uptime': 'System Uptime',
    'user_management': 'User Management',
    'manage_users_permissions': 'Manage users and their permissions',
    'recent_activity': 'Recent Activity',
    'latest_system_events': 'Latest system events and updates',
    'view_all_users': 'View All Users',
    'view_full_log': 'View Full Log',
    
    // Video Call
    'video_consultation': 'Video Consultation',
    'connecting': 'Connecting...',
    'end_call': 'End Call',
    'mute': 'Mute',
    'camera': 'Camera',
    'screen_share': 'Screen Share',
    
    // Language Selector
    'select_language': 'Select Language',
    'choose_preferred_language': 'Choose your preferred language for the interface',
    'current_language': 'Current Language',
    'selected_language': 'Selected Language',
    'apply': 'Apply',
    'language_changed': 'Language changed successfully!',
    
    // Common
    'edit_profile': 'Edit Profile',
    'status_completed': 'completed',
    'status_cancelled': 'cancelled',
    'status_processing': 'processing',
    'status_dispensed': 'dispensed'
  },
  
  'hi': {
    // Navigation  
    'patient_portal': 'रोगी पोर्टल',
    'symptom_checker': 'लक्षण जांचकर्ता',
    'doctor_dashboard': 'डॉक्टर डैशबोर्ड',
    'pharmacy': 'फार्मेसी',
    'admin_panel': 'एडमिन पैनल',
    'language_settings': 'भाषा सेटिंग्स',
    
    // Patient Portal
    'next_appointment': 'अगली अपॉइंटमेंट',
    'tomorrow': 'कल',
    'health_score': 'स्वास्थ्य स्कोर',
    'good': 'अच्छा',
    'active_prescriptions': 'सक्रिय नुस्खे',
    'current_medications': 'वर्तमान दवाएं',
    'my_appointments': 'मेरी अपॉइंटमेंट्स',
    'upcoming_past_consultations': 'आगामी और पिछली परामर्श',
    'upcoming': 'आगामी',
    'past': 'पिछला',
    'join_call': 'कॉल में शामिल हों',
    'view_details': 'विवरण देखें',
    'view_notes': 'नोट्स देखें',
    'medical_records': 'चिकित्सा रिकॉर्ड',
    'health_history_documents': 'आपका स्वास्थ्य इतिहास और दस्तावेज',
    'general_checkup': 'सामान्य जांच',
    'medication_prescribed': 'दवा निर्धारित',
    'blood_test_results': 'रक्त परीक्षण परिणाम',
    'routine_checkup_completed': 'नियमित जांच पूरी हुई। सभी महत्वपूर्ण संकेत सामान्य। 6 महीने में फॉलो-अप की सिफारिश।',
    'amoxicillin_prescribed': 'मामूली संक्रमण के लिए एमोक्सिसिलिन 500mg निर्धारित। दिन में 3 बार 7 दिन तक लें।',
    'blood_test_normal': 'पूर्ण रक्त गणना परिणाम सामान्य सीमा में। कोलेस्ट्रॉल का स्तर थोड़ा बढ़ा हुआ।',
    
    // Doctor Dashboard
    'todays_patients': 'आज के रोगी',
    'waiting': 'प्रतीक्षा में',
    'completed': 'पूर्ण',
    'high_priority': 'उच्च प्राथमिकता',
    'patient_queue': 'रोगी कतार',
    'manage_consultations': 'अपनी परामर्श और रोगी प्रवाह का प्रबंधन करें',
    'start_consultation': 'परामर्श शुरू करें',
    'view_history': 'इतिहास देखें',
    'symptoms': 'लक्षण',
    'scheduled': 'निर्धारित',
    'age': 'आयु',
    'priority': 'प्राथमिकता',
    'high': 'उच्च',
    'medium': 'मध्यम',
    'low': 'कम',
    
    // Pharmacy
    'pending': 'लंबित',
    'ready': 'तैयार',
    'low_stock': 'कम स्टॉक',
    'total_items': 'कुल आइटम',
    'e_prescriptions': 'ई-प्रिस्क्रिप्शन',
    'manage_process_prescriptions': 'प्रिस्क्रिप्शन का प्रबंधन और प्रक्रिया',
    'prescribed_by': 'द्वारा निर्धारित',
    'qty': 'मात्रा',
    'in_stock': 'स्टॉक में',
    'out_of_stock': 'स्टॉक नहीं',
    'process': 'प्रक्रिया',
    'mark_ready': 'तैयार चिह्नित करें',
    'inventory_management': 'इन्वेंटरी प्रबंधन',
    'track_medication_stock': 'दवा स्टॉक और उपलब्धता ट्रैक करें',
    'search_medications': 'दवाएं खोजें',
    'search_name_category': 'नाम या श्रेणी द्वारा खोजें...',
    'expires': 'समाप्ति',
    'stock': 'स्टॉक',
    
    // Symptom Checker
    'ai_symptom_checker': 'AI लक्षण जांचकर्ता',
    'describe_symptoms': 'अपने लक्षणों का वर्णन करें और तुरंत AI-संचालित स्वास्थ्य अंतर्दृष्टि प्राप्त करें',
    'describe_symptoms_placeholder': 'कृपया अपने लक्षणों का विस्तार से वर्णन करें...',
    'analyze_symptoms': 'लक्षणों का विश्लेषण करें',
    'analyzing': 'विश्लेषण कर रहा है...',
    'health_insights': 'स्वास्थ्य अंतर्दृष्टि',
    'based_on_symptoms': 'आपके लक्षणों के आधार पर, यहां कुछ संभावित अंतर्दृष्टि हैं:',
    'disclaimer': 'अस्वीकरण: यह चिकित्सा निदान नहीं है। उचित चिकित्सा सलाह के लिए कृपया स्वास्थ्य पेशेवर से सलाह लें।',
    'schedule_consultation': '• यदि लक्षण बिगड़ते हैं तो स्वास्थ्य सेवा प्रदाता के साथ परामर्श का समय निर्धारित करें',
    
    // Admin Panel
    'system_overview': 'सिस्टम अवलोकन',
    'monitor_platform_performance': 'प्लेटफॉर्म प्रदर्शन और उपयोगकर्ता गतिविधि की निगरानी करें',
    'total_users': 'कुल उपयोगकर्ता',
    'active_sessions': 'सक्रिय सत्र',
    'appointments_today': 'आज की अपॉइंटमेंट्स',
    'system_uptime': 'सिस्टम अपटाइम',
    'user_management': 'उपयोगकर्ता प्रबंधन',
    'manage_users_permissions': 'उपयोगकर्ताओं और उनकी अनुमतियों का प्रबंधन करें',
    'recent_activity': 'हाल की गतिविधि',
    'latest_system_events': 'नवीनतम सिस्टम इवेंट और अपडेट',
    'view_all_users': 'सभी उपयोगकर्ता देखें',
    'view_full_log': 'पूरा लॉग देखें',
    
    // Video Call
    'video_consultation': 'वीडियो परामर्श',
    'connecting': 'कनेक्ट हो रहा है...',
    'end_call': 'कॉल समाप्त करें',
    'mute': 'म्यूट',
    'camera': 'कैमरा',
    'screen_share': 'स्क्रीन शेयर',
    
    // Language Selector
    'select_language': 'भाषा चुनें',
    'choose_preferred_language': 'इंटरफेस के लिए अपनी पसंदीदा भाषा चुनें',
    'current_language': 'वर्तमान भाषा',
    'selected_language': 'चयनित भाषा',
    'apply': 'लागू करें',
    'language_changed': 'भाषा सफलतापूर्वक बदल गई!',
    
    // Common
    'edit_profile': 'प्रोफ़ाइल संपादित करें',
    'status_completed': 'पूर्ण',
    'status_cancelled': 'रद्द',
    'status_processing': 'प्रसंस्करण',
    'status_dispensed': 'वितरित'
  },
  
  'pa': {
    // Navigation
    'patient_portal': 'ਮਰੀਜ਼ ਪੋਰਟਲ',
    'symptom_checker': 'ਲੱਛਣ ਜਾਂਚਕਰਤਾ',
    'doctor_dashboard': 'ਡਾਕਟਰ ਡੈਸ਼ਬੋਰਡ',
    'pharmacy': 'ਫਾਰਮੇਸੀ',
    'admin_panel': 'ਐਡਮਿਨ ਪੈਨਲ',
    'language_settings': 'ਭਾਸ਼ਾ ਸੈਟਿੰਗ',
    
    // Patient Portal
    'next_appointment': 'ਅਗਲੀ ਮੁਲਾਕਾਤ',
    'tomorrow': 'ਕੱਲ੍ਹ',
    'health_score': 'ਸਿਹਤ ਸਕੋਰ',
    'good': 'ਚੰਗਾ',
    'active_prescriptions': 'ਸਰਗਰਮ ਨੁਸਖੇ',
    'current_medications': 'ਮੌਜੂਦਾ ਦਵਾਈਆਂ',
    'my_appointments': 'ਮੇਰੀਆਂ ਮੁਲਾਕਾਤਾਂ',
    'upcoming_past_consultations': 'ਆਉਣ ਵਾਲੀਆਂ ਅਤੇ ਪਿਛਲੀਆਂ ਸਲਾਹਾਂ',
    'upcoming': 'ਆਉਣ ਵਾਲਾ',
    'past': 'ਪਿਛਲਾ',
    'join_call': 'ਕਾਲ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ',
    'view_details': 'ਵੇਰਵੇ ਵੇਖੋ',
    'view_notes': 'ਨੋਟਸ ਵੇਖੋ',
    'medical_records': 'ਡਾਕਟਰੀ ਰਿਕਾਰਡ',
    'health_history_documents': 'ਤੁਹਾਡਾ ਸਿਹਤ ਇਤਿਹਾਸ ਅਤੇ ਦਸਤਾਵੇਜ਼',
    'general_checkup': 'ਆਮ ਜਾਂਚ',
    'medication_prescribed': 'ਦਵਾਈ ਦਿੱਤੀ ਗਈ',
    'blood_test_results': 'ਖੂਨ ਦੀ ਜਾਂਚ ਦੇ ਨਤੀਜੇ',
    'routine_checkup_completed': 'ਰੂਟੀਨ ਚੈੱਕਅਪ ਪੂਰਾ ਹੋਇਆ। ਸਾਰੇ ਮਹੱਤਵਪੂਰਨ ਸੰਕੇਤ ਸਧਾਰਨ। 6 ਮਹੀਨਿਆਂ ਵਿੱਚ ਫਾਲੋ-ਅਪ ਦੀ ਸਿਫਾਰਸ਼।',
    'amoxicillin_prescribed': 'ਮਾਮੂਲੀ ਲਾਗ ਲਈ ਐਮੋਕਸੀਸਿਲਿਨ 500mg ਦਿੱਤੀ ਗਈ। ਦਿਨ ਵਿੱਚ 3 ਵਾਰ 7 ਦਿਨ ਤੱਕ ਲਓ।',
    'blood_test_normal': 'ਪੂਰੀ ਖੂਨ ਗਿਣਤੀ ਦੇ ਨਤੀਜੇ ਸਧਾਰਨ ਸੀਮਾ ਵਿੱਚ। ਕੋਲੇਸਟਰੋਲ ਦਾ ਪੱਧਰ ਥੋੜ੍ਹਾ ਵਧਿਆ ਹੋਇਆ।',
    
    // Doctor Dashboard
    'todays_patients': 'ਅੱਜ ਦੇ ਮਰੀਜ਼',
    'waiting': 'ਇੰਤਜ਼ਾਰ ਵਿੱਚ',
    'completed': 'ਪੂਰਾ',
    'high_priority': 'ਉੱਚ ਤਰਜੀਹ',
    'patient_queue': 'ਮਰੀਜ਼ ਕਤਾਰ',
    'manage_consultations': 'ਆਪਣੀਆਂ ਸਲਾਹਾਂ ਅਤੇ ਮਰੀਜ਼ ਪ੍ਰਵਾਹ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ',
    'start_consultation': 'ਸਲਾਹ ਸ਼ੁਰੂ ਕਰੋ',
    'view_history': 'ਇਤਿਹਾਸ ਵੇਖੋ',
    'symptoms': 'ਲੱਛਣ',
    'scheduled': 'ਨਿਰਧਾਰਿਤ',
    'age': 'ਉਮਰ',
    'priority': 'ਤਰਜੀਹ',
    'high': 'ਉੱਚ',
    'medium': 'ਮੱਧਮ',
    'low': 'ਘੱਟ',
    
    // Pharmacy
    'pending': 'ਲੰਬਿਤ',
    'ready': 'ਤਿਆਰ',
    'low_stock': 'ਘੱਟ ਸਟਾਕ',
    'total_items': 'ਕੁੱਲ ਆਈਟਮਾਂ',
    'e_prescriptions': 'ਈ-ਨੁਸਖੇ',
    'manage_process_prescriptions': 'ਨੁਸਖਿਆਂ ਦਾ ਪ੍ਰਬੰਧਨ ਅਤੇ ਪ੍ਰਕਿਰਿਆ',
    'prescribed_by': 'ਦੁਆਰਾ ਦਿੱਤਾ ਗਿਆ',
    'qty': 'ਮਾਤਰਾ',
    'in_stock': 'ਸਟਾਕ ਵਿੱਚ',
    'out_of_stock': 'ਸਟਾਕ ਨਹੀਂ',
    'process': 'ਪ੍ਰਕਿਰਿਆ',
    'mark_ready': 'ਤਿਆਰ ਮਾਰਕ ਕਰੋ',
    'inventory_management': 'ਵਸਤੂ ਪ੍ਰਬੰਧਨ',
    'track_medication_stock': 'ਦਵਾਈ ਸਟਾਕ ਅਤੇ ਉਪਲਬਧਤਾ ਟਰੈਕ ਕਰੋ',
    'search_medications': 'ਦਵਾਈਆਂ ਖੋਜੋ',
    'search_name_category': 'ਨਾਮ ਜਾਂ ਸ਼੍ਰੇਣੀ ਦੁਆਰਾ ਖੋਜੋ...',
    'expires': 'ਸਮਾਪਤੀ',
    'stock': 'ਸਟਾਕ',
    
    // Symptom Checker
    'ai_symptom_checker': 'AI ਲੱਛਣ ਜਾਂਚਕਰਤਾ',
    'describe_symptoms': 'ਆਪਣੇ ਲੱਛਣਾਂ ਦਾ ਵਰਣਨ ਕਰੋ ਅਤੇ ਤੁਰੰਤ AI-ਸੰਚਾਲਿਤ ਸਿਹਤ ਸੂਝ ਪ੍ਰਾਪਤ ਕਰੋ',
    'describe_symptoms_placeholder': 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਲੱਛਣਾਂ ਦਾ ਵਿਸਤਾਰ ਨਾਲ ਵਰਣਨ ਕਰੋ...',
    'analyze_symptoms': 'ਲੱਛਣਾਂ ਦਾ ਵਿਸ਼ਲੇਸ਼ਣ ਕਰੋ',
    'analyzing': 'ਵਿਸ਼ਲੇਸ਼ਣ ਕਰ ਰਿਹਾ ਹੈ...',
    'health_insights': 'ਸਿਹਤ ਸੂਝ',
    'based_on_symptoms': 'ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਦੇ ਆਧਾਰ ਤੇ, ਇੱਥੇ ਕੁਝ ਸੰਭਾਵਿਤ ਸੂਝਾਂ ਹਨ:',
    'disclaimer': 'ਅਸਵੀਕਰਣ: ਇਹ ਡਾਕਟਰੀ ਨਿਦਾਨ ਨਹੀਂ ਹੈ। ਸਹੀ ਡਾਕਟਰੀ ਸਲਾਹ ਲਈ ਕਿਰਪਾ ਕਰਕੇ ਸਿਹਤ ਪੇਸ਼ੇਵਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।',
    'schedule_consultation': '• ਜੇ ਲੱਛਣ ਬਿਗੜਦੇ ਹਨ ਤਾਂ ਸਿਹਤ ਸੇਵਾ ਪ੍ਰਦਾਤਾ ਨਾਲ ਸਲਾਹ ਦਾ ਸਮਾਂ ਨਿਰਧਾਰਿਤ ਕਰੋ',
    
    // Admin Panel
    'system_overview': 'ਸਿਸਟਮ ਸੰਖੇਪ',
    'monitor_platform_performance': 'ਪਲੇਟਫਾਰਮ ਪ੍ਰਦਰਸ਼ਨ ਅਤੇ ਵਰਤੋਂਕਾਰ ਗਤੀਵਿਧੀ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ',
    'total_users': 'ਕੁੱਲ ਵਰਤੋਂਕਾਰ',
    'active_sessions': 'ਸਰਗਰਮ ਸੈਸ਼ਨ',
    'appointments_today': 'ਅੱਜ ਦੀਆਂ ਮੁਲਾਕਾਤਾਂ',
    'system_uptime': 'ਸਿਸਟਮ ਅਪਟਾਇਮ',
    'user_management': 'ਵਰਤੋਂਕਾਰ ਪ੍ਰਬੰਧਨ',
    'manage_users_permissions': 'ਵਰਤੋਂਕਾਰਾਂ ਅਤੇ ਉਨ੍ਹਾਂ ਦੀਆਂ ਆਗਿਆਵਾਂ ਦਾ ਪ੍ਰਬੰਧਨ ਕਰੋ',
    'recent_activity': 'ਹਾਲ ਦੀ ਗਤੀਵਿਧੀ',
    'latest_system_events': 'ਨਵੀਨਤਮ ਸਿਸਟਮ ਇਵੈਂਟਸ ਅਤੇ ਅਪਡੇਟਸ',
    'view_all_users': 'ਸਾਰੇ ਵਰਤੋਂਕਾਰ ਵੇਖੋ',
    'view_full_log': 'ਪੂਰਾ ਲਾਗ ਵੇਖੋ',
    
    // Video Call
    'video_consultation': 'ਵੀਡੀਓ ਸਲਾਹ',
    'connecting': 'ਕਨੈਕਟ ਹੋ ਰਿਹਾ ਹੈ...',
    'end_call': 'ਕਾਲ ਸਮਾਪਤ ਕਰੋ',
    'mute': 'ਮਿਊਟ',
    'camera': 'ਕੈਮਰਾ',
    'screen_share': 'ਸਕਰੀਨ ਸਾਂਝਾ ਕਰੋ',
    
    // Language Selector
    'select_language': 'ਭਾਸ਼ਾ ਚੁਣੋ',
    'choose_preferred_language': 'ਇੰਟਰਫੇਸ ਲਈ ਆਪਣੀ ਪਸੰਦੀਦਾ ਭਾਸ਼ਾ ਚੁਣੋ',
    'current_language': 'ਮੌਜੂਦਾ ਭਾਸ਼ਾ',
    'selected_language': 'ਚੁਣੀ ਗਈ ਭਾਸ਼ਾ',
    'apply': 'ਲਾਗੂ ਕਰੋ',
    'language_changed': 'ਭਾਸ਼ਾ ਸਫਲਤਾਪੂਰਵਕ ਬਦਲੀ ਗਈ!',
    
    // Common
    'edit_profile': 'ਪ੍ਰੋਫਾਈਲ ਸੰਪਾਦਿਤ ਕਰੋ',
    'status_completed': 'ਪੂਰਾ',
    'status_cancelled': 'ਰੱਦ',
    'status_processing': 'ਪ੍ਰਕਿਰਿਆ',
    'status_dispensed': 'ਵੰਡਿਆ ਗਿਆ'
  }
};

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem('selectedLanguage', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};