document.addEventListener('DOMContentLoaded', function() {
    const startupTime = new Date().toLocaleTimeString('fr-FR');
    document.getElementById('startup-time').textContent = startupTime;
    
    const demoBtn = document.getElementById('demo-btn');
    const output = document.getElementById('output');
    let clickCount = 0;
    
    const messages = [
        "👋 Bonjour !",
        "🎉 Bun est super rapide !",
        "🔥 Hot reload en action !",
        "✨ Modifiez le code et voyez la magie !",
        "🚀 Développement moderne avec Bun !",
        "💫 WebSockets pour le temps réel !",
        "🎯 Performance optimale !",
        "🌟 Simplicité et puissance !"
    ];
    
    demoBtn.addEventListener('click', function() {
        clickCount++;
        const message = messages[clickCount % messages.length];
        output.textContent = `${message} (Clic #${clickCount})`;
        output.classList.add('bounce');
        
        // Animation
        setTimeout(() => {
            output.classList.remove('bounce');
        }, 1000);
        
        // Changer la couleur du bouton
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        demoBtn.style.background = `linear-gradient(45deg, ${randomColor}, #764ba2)`;
    });
    
    // Effet de défilement smooth
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Effet de hover sur les éléments de liste
    document.querySelectorAll('.features li').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#e6fffa';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#f7fafc';
        });
    });
    
    console.log('🎯 Script chargé avec succès !');
    console.log('🔥 Hot reload prêt !');
});