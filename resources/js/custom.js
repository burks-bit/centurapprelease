import AOS from 'aos';
import 'aos/dist/aos.css';

document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800, // Animation duration
        easing: 'ease-in-out', // Animation easing
        once: true // Only animate once
    });
});
