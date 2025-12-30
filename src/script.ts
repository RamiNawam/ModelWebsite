interface NavigationElements {
    navToggle: HTMLElement | null;
    navMenu: HTMLElement | null;
    navLinks: NodeListOf<HTMLAnchorElement>;
}

interface ScrollOptions {
    top: number;
    behavior?: ScrollBehavior;
}

interface ObserverOptions {
    threshold: number;
    rootMargin: string;
}

interface MenuStation {
    title: string;
    items: Array<{
        name: string;
        description: string;
    }>;
    imagePlaceholder: string;
}

interface GalleryItem {
    id: number;
    url: string;
    span: string;
}

class MenuDashboard {
    private dashboardCards: NodeListOf<HTMLElement>;
    private stationDetails: HTMLElement | null;
    private detailsTitle: HTMLElement | null;
    private detailsItems: HTMLElement | null;
    private detailsImage: HTMLElement | null;

    private menuData: Record<string, MenuStation> = {
        shawarma: {
            title: "Shawarma Station",
            items: [
                { name: "Beef Shawarma", description: "Tender marinated beef wrapped in fresh pita with our signature sauce" },
                { name: "Chicken Shawarma", description: "Juicy grilled chicken with herbs and spices in warm pita bread" }
            ],
            imagePlaceholder: "assets/images/dunyapics/beef.jpg,assets/images/dunyapics/chicken.jpg"
        },
        falafel: {
            title: "Falafel Station",
            items: [
                { name: "Classic Falafel", description: "Crispy chickpea fritters with tahini sauce and fresh vegetables" }
            ],
            imagePlaceholder: "assets/images/dunyapics/falafel.jpeg"
        },
        sides: {
            title: "Sides & Refreshments",
            items: [
                { name: "Fattouch Salad", description: "Fresh mixed greens with toasted pita chips and sumac dressing" },
                { name: "Golden Fries", description: "Crispy seasoned fries served with our special dipping sauce" },
                { name: "Homemade Ice Tea", description: "Refreshing brewed tea with a hint of mint and lemon" }
            ],
            imagePlaceholder: "assets/images/dunyapics/DUNYA-06.jpg"
        },
        drinks: {
            title: "Drinks Station",
            items: [
                { name: "Refreshing Beverages", description: "A variety of cold drinks and juices to complement your meal" }
            ],
            imagePlaceholder: "assets/images/dunyapics/download (1).jpeg"
        },
        icecream: {
            title: "Authentic Lebanese Ice Cream",
            items: [
                { name: "Traditional Flavors", description: "Hand-churned ice cream with authentic Lebanese recipes and premium ingredients" }
            ],
            imagePlaceholder: "assets/images/dunyapics/ICECREAM.jpg"
        }
    };

    constructor() {
        this.dashboardCards = document.querySelectorAll('.dashboard-card');
        this.stationDetails = document.getElementById('stationDetails');
        this.detailsTitle = document.getElementById('detailsTitle');
        this.detailsItems = document.getElementById('detailsItems');
        this.detailsImage = document.getElementById('detailsImage');
        this.init();
    }

    private init(): void {
        this.setupCardListeners();
    }

    private setupCardListeners(): void {
        this.dashboardCards.forEach(card => {
            card.addEventListener('click', () => {
                const station = card.getAttribute('data-station');
                if (station) {
                    this.selectStation(station, card);
                }
            });
        });
    }

    private selectStation(station: string, clickedCard: HTMLElement): void {
        // Remove active class from all cards
        this.dashboardCards.forEach(card => {
            card.classList.remove('active');
        });

        // Add active class to clicked card
        clickedCard.classList.add('active');

        // Remove all existing theme classes from station details and show the section
        if (this.stationDetails) {
            this.stationDetails.classList.remove('shawarma-theme', 'falafel-theme', 'sides-theme', 'drinks-theme', 'icecream-theme');
            
            // Add appropriate theme class based on station
            this.stationDetails.classList.add(`${station}-theme`);
            
            // Show the station details section
            this.stationDetails.style.display = 'block';
        }

        // Update station details
        const menuStation = this.menuData[station];
        if (menuStation && this.detailsTitle && this.detailsItems && this.detailsImage) {
            // Update title
            this.detailsTitle.textContent = menuStation.title;

            // Update items
            this.detailsItems.innerHTML = '';
            menuStation.items.forEach(item => {
                const menuItemDiv = document.createElement('div');
                menuItemDiv.className = 'menu-item';
                menuItemDiv.innerHTML = `
                    <h4>${item.name}</h4>
                    <p>${item.description}</p>
                `;
                if (this.detailsItems) {
                    this.detailsItems.appendChild(menuItemDiv);
                }
            });

            // Update image
            if (station === 'shawarma') {
                const images = menuStation.imagePlaceholder.split(',');
                this.detailsImage.innerHTML = `
                    <div class="shawarma-images">
                        <img src="${images[0]}" alt="Beef Shawarma" class="menu-image">
                        <img src="${images[1]}" alt="Chicken Shawarma" class="menu-image">
                    </div>
                `;
            } else {
                this.detailsImage.innerHTML = `<img src="${menuStation.imagePlaceholder}" alt="${menuStation.title}" class="menu-image">`;
            }

            // Smooth scroll to details
            if (this.stationDetails) {
                this.stationDetails.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'nearest' 
                } as ScrollIntoViewOptions);
            }
        }
    }
}

class ShawarmaHealthBar {
    private healthBarFill: HTMLElement | null;
    private healthBarTime: HTMLElement | null;
    private updateInterval: number | null = null;

    constructor() {
        this.healthBarFill = document.getElementById('healthBarFill');
        this.healthBarTime = document.getElementById('healthBarTime');
        this.init();
    }

    private init(): void {
        this.updateHealthBar();
        // Update every minute
        this.updateInterval = window.setInterval(() => {
            this.updateHealthBar();
        }, 60000);
    }

    private getMontrealTime(): Date {
        // Get current time in Montreal timezone (Eastern Time)
        const now = new Date();
        const montrealTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Montreal"}));
        return montrealTime;
    }

    private updateHealthBar(): void {
        if (!this.healthBarFill || !this.healthBarTime) return;

        const now = this.getMontrealTime();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        const currentTimeInMinutes = currentHour * 60 + currentMinute;

        // Start time: 11:30 AM (690 minutes from midnight)
        const startTime = 11 * 60 + 30; // 690 minutes
        // End time: 10:00 PM (1320 minutes from midnight)
        const endTime = 22 * 60; // 1320 minutes
        
        const totalDuration = endTime - startTime; // 630 minutes (10.5 hours)

        let percentage = 100;
        let status = "Fresh & Ready!";
        let timeDisplay = "";

        if (currentTimeInMinutes < startTime) {
            // Before opening
            percentage = 100;
            status = "Opening Soon!";
            const hoursUntilOpen = Math.floor((startTime - currentTimeInMinutes) / 60);
            const minutesUntilOpen = (startTime - currentTimeInMinutes) % 60;
            timeDisplay = `Opens in ${hoursUntilOpen}h ${minutesUntilOpen}m`;
        } else if (currentTimeInMinutes >= endTime) {
            // After closing
            percentage = 0;
            status = "Sold Out!";
            timeDisplay = "Opens tomorrow at 11:30 AM";
        } else {
            // During operating hours
            const elapsed = currentTimeInMinutes - startTime;
            percentage = Math.max(0, 100 - (elapsed / totalDuration) * 100);
            
            if (percentage > 75) {
                status = "Fresh & Plenty!";
            } else if (percentage > 50) {
                status = "Getting Low";
            } else if (percentage > 25) {
                status = "Almost Gone!";
            } else if (percentage > 0) {
                status = "Last Pieces!";
            } else {
                status = "Sold Out!";
            }

            const remainingMinutes = endTime - currentTimeInMinutes;
            const remainingHours = Math.floor(remainingMinutes / 60);
            const remainingMins = remainingMinutes % 60;
            timeDisplay = `${remainingHours}h ${remainingMins}m left`;
        }

        // Update the health bar
        this.healthBarFill.style.width = `${percentage}%`;
        
        // Update the text
        const label = document.querySelector('.health-bar-label') as HTMLElement;
        if (label) {
            label.textContent = status;
        }
        
        if (this.healthBarTime) {
            this.healthBarTime.textContent = timeDisplay;
        }

        // Add visual effects based on percentage
        if (percentage <= 25 && percentage > 0) {
            this.healthBarFill.style.animation = 'healthBarPulse 1s ease-in-out infinite';
        } else {
            this.healthBarFill.style.animation = '';
        }
    }

    public destroy(): void {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }
    }
}

class Gallery {
    private galleryGrid: HTMLElement | null;
    private galleryItems: GalleryItem[] = [
        {
            id: 1,
            url: 'assets/images/dunyapics/2025-11-12 (1).jpg',
            span: 'span-1-3'
        },
        {
            id: 2,
            url: 'assets/images/dunyapics/2025-11-12.jpg',
            span: 'span-2-2'
        },
        {
            id: 3,
            url: 'assets/images/dunyapics/download (1).jpeg',
            span: 'span-1-3'
        },
        {
            id: 4,
            url: 'assets/images/dunyapics/download (2).jpeg',
            span: 'span-2-2'
        },
        {
            id: 5,
            url: 'assets/images/dunyapics/download (3).jpeg',
            span: 'span-1-3'
        },
        {
            id: 6,
            url: 'assets/images/dunyapics/download.jpeg',
            span: 'span-2-2'
        },
        {
            id: 7,
            url: 'assets/images/dunyapics/DUNYA-56.jpg',
            span: 'span-2-3'
        }
    ];

    constructor() {
        this.galleryGrid = document.getElementById('galleryGrid');
        this.init();
    }

    private init(): void {
        if (!this.galleryGrid) return;
        this.renderGallery();
    }

    private renderGallery(): void {
        if (!this.galleryGrid) return;

        this.galleryItems.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item ${item.span}`;
            
            const img = document.createElement('img');
            img.src = item.url;
            img.alt = `Gallery image ${item.id}`;
            img.loading = 'lazy';
            
            galleryItem.appendChild(img);
            this.galleryGrid!.appendChild(galleryItem);
        });
    }
}

class DunyaWebsite {
    private elements: NavigationElements;
    private observer: IntersectionObserver;
    private shawarmaHealthBar: ShawarmaHealthBar;
    private menuDashboard: MenuDashboard;
    private gallery: Gallery;

    constructor() {
        this.elements = {
            navToggle: document.getElementById('nav-toggle'),
            navMenu: document.getElementById('nav-menu'),
            navLinks: document.querySelectorAll('.nav-link')
        };

        this.observer = this.createObserver();
        this.shawarmaHealthBar = new ShawarmaHealthBar();
        this.menuDashboard = new MenuDashboard();
        this.gallery = new Gallery();
        this.init();
    }

    private init(): void {
        this.setupNavigation();
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.setupParallax();
        this.setupClickOutside();
        this.addHealthBarPulseAnimation();
    }

    private addHealthBarPulseAnimation(): void {
        // Add CSS for pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes healthBarPulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.6; }
            }
        `;
        document.head.appendChild(style);
    }

    private setupNavigation(): void {
        if (!this.elements.navToggle || !this.elements.navMenu) {
            console.warn('Navigation elements not found');
            return;
        }

        this.elements.navToggle.addEventListener('click', () => {
            this.elements.navMenu?.classList.toggle('active');
            this.elements.navToggle?.classList.toggle('active');
        });
    }

    private setupSmoothScrolling(): void {
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e: Event) => {
                e.preventDefault();
                this.elements.navMenu?.classList.remove('active');
                this.elements.navToggle?.classList.remove('active');
                
                const targetId = link.getAttribute('href');
                if (!targetId) return;

                const targetSection = document.querySelector(targetId);
                if (!targetSection) return;

                const offsetTop = targetSection.getBoundingClientRect().top + window.pageYOffset - 70;
                const scrollOptions: ScrollOptions = {
                    top: offsetTop,
                    behavior: 'smooth'
                };

                window.scrollTo(scrollOptions);
            });
        });
    }

    private createObserver(): IntersectionObserver {
        const observerOptions: ObserverOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        return new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target as HTMLElement;
                    target.style.opacity = '1';
                    target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
    }

    private setupAnimations(): void {
        const animatedElements = document.querySelectorAll('.dashboard-card, .contact-item');
        
        animatedElements.forEach(el => {
            const element = el as HTMLElement;
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            this.observer.observe(element);
        });
    }

    private setupParallax(): void {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content') as HTMLElement;
            
            if (hero && heroContent) {
                const rate = scrolled * -0.5;
                heroContent.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    private setupClickOutside(): void {
        document.addEventListener('click', (e: Event) => {
            const target = e.target as HTMLElement;
            
            if (this.elements.navToggle && this.elements.navMenu) {
                if (!this.elements.navToggle.contains(target) && 
                    !this.elements.navMenu.contains(target)) {
                    this.elements.navMenu.classList.remove('active');
                    this.elements.navToggle.classList.remove('active');
                }
            }
        });
    }

    public destroy(): void {
        this.shawarmaHealthBar.destroy();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DunyaWebsite();
});
