 const canvas = document.getElementById('fireflyCanvas');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let fireflies = [];
        const numberOfFireflies = 100;

        function Firefly() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.radius = Math.random() * 2 + 1; // Tamaño de la luciérnaga
            this.lightRadius = Math.random() * 5 + 1; // Radio del brillo
            this.speedX = (Math.random() - 0.5) * 0.5; // Velocidad de movimiento
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = 0;
            this.fadeIn = true;
            this.blinkSpeed = Math.random() * 0.02 + 0.01; // Velocidad de parpadeo
            this.hue = Math.random() * 60 + 240; // Tono entre amarillo y verde
        }

        Firefly.prototype.update = function () {
            this.x += this.speedX;
            this.y += this.speedY;

            // Rebotar en los bordes
            if (this.x < 0 || this.x > canvas.width) {
                this.speedX *= -1;
            }
            if (this.y < 0 || this.y > canvas.height) {
                this.speedY *= -1;
            }

            // Efecto de encendido y apagado
            if (this.fadeIn) {
                this.opacity += this.blinkSpeed;
                if (this.opacity >= 1) {
                    this.opacity = 1;
                    this.fadeIn = false;
                }
            } else {
                this.opacity -= this.blinkSpeed;
                if (this.opacity <= 0) {
                    this.opacity = 0;
                    this.fadeIn = true;
                    // Cambiar ligeramente la posición para que no parezca que siempre parpadea en el mismo lugar
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;
                }
            }
        };

        Firefly.prototype.draw = function () {
            if (this.opacity <= 0) return; // No dibujar si está completamente apagada

            // Dibujar el brillo
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.lightRadius);
            gradient.addColorStop(0, `hsla(${this.hue}, 100%, 70%, ${this.opacity * 0.8})`);
            gradient.addColorStop(0.5, `hsla(${this.hue}, 100%, 50%, ${this.opacity * 0.4})`);
            gradient.addColorStop(1, `hsla(${this.hue}, 100%, 50%, 0)`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.lightRadius, 0, Math.PI * 2);
            ctx.fill();

            // Dibujar el cuerpo de la luciérnaga
            ctx.fillStyle = `hsla(${this.hue}, 100%, 95%, ${this.opacity})`; // Un azul muy claro
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        };

        function init() {
            for (let i = 0; i < numberOfFireflies; i++) {
                fireflies.push(new Firefly());
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el canvas

            for (let i = 0; i < fireflies.length; i++) {
                fireflies[i].update();
                fireflies[i].draw();
            }
        }

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Opcional: Reiniciar las luciérnagas o ajustar sus posiciones si el tamaño cambia mucho
            // fireflies = [];
            // init();
        });

        init();
        animate();