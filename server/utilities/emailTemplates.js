
const welcomeEmailTemplate = (username) => `
     <html >
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to Votera</title>
            <style>
                
                .email-container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                }
                
                .header {
                background: linear-gradient(
                    to right,
                    #fb923c 0%,  
                    #fbbf24 100%  
                );
                padding: 40px 30px;
                text-align: center;
                color: white;
            }
                .logo {
                    font-size: 2.5rem;
                    font-weight: 800;
                    margin-bottom: 8px;
                    text-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .tagline {
                    font-size: 1.1rem;
                    opacity: 0.9;
                    font-weight: 300;
                }
                
                .content {
                    padding: 40px 30px;
                }
                
                .welcome-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #2d3748;
                    margin-bottom: 20px;
                    text-align: center;
                }
                
                .welcome-message {
                    font-size: 1.1rem;
                    color: #4a5568;
                    margin-bottom: 30px;
                    text-align: center;
                    line-height: 1.7;
                }
                
                .features {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 20px;
                    margin: 30px 0;
                    justify-content: center;
                }
                
                .feature {
                    flex: 1;
                    min-width: 150px;
                    text-align: center;
                    padding: 20px 15px;
                    background: #f7fafc;
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                }
                
                .feature-icon {
                    font-size: 2rem;
                    margin-bottom: 10px;
                    display: block;
                }
                
                .feature-title {
                    font-weight: 600;
                    color: #2d3748;
                    margin-bottom: 5px;
                }
                
                .feature-desc {
                    font-size: 0.9rem;
                    color: #718096;
                }
                
                .cta-container {
                    text-align: center;
                    margin: 40px 0 20px;
                }
                
              .cta-button {
                    display: inline-block;
                    background: linear-gradient(to right, #fb923c 0%, #fbbf24 100%); 
                    color: white;
                    text-decoration: none;
                    padding: 16px 32px;
                    border-radius: 50px;
                    font-weight: 600;
                    font-size: 1.1rem;
                    box-shadow: 0 10px 20px rgba(251, 146, 60, 0.3); 
                    transition: all 0.3s ease;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .cta-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 15px 30px rgba(251, 146, 60, 0.4); 
                }
                
                .footer {
                    background: #f8f9fa;
                    padding: 30px;
                    text-align: center;
                    border-top: 1px solid #e9ecef;
                }
                
                .footer-text {
                    color: #6c757d;
                    font-size: 0.9rem;
                    margin-bottom: 10px;
                }
                
                .social-links {
                    margin-top: 20px;
                }
                
                .social-link {
                    display: inline-block;
                    margin: 0 10px;
                    color: #667eea;
                    text-decoration: none;
                    font-size: 1.2rem;
                }
                
                @media (max-width: 600px) {
                    body {
                        padding: 10px;
                    }
                    
                    .content {
                        padding: 30px 20px;
                    }
                    
                    .features {
                        flex-direction: column;
                    }
                    
                    .feature {
                        min-width: auto;
                    }
                    
                    .welcome-title {
                        font-size: 1.6rem;
                    }
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <div class="logo">VOTERA</div>
                    <div class="tagline">Where Every Voice Matters</div>
                </div>
                
                <div class="content">
                    <h1 class="welcome-title">Welcome, ${username}! 🎉</h1>
                    
                    <p class="welcome-message">
                        Thanks for joining Votera! You're now part of a vibrant community where your opinion truly counts. 
                        Get ready to explore, engage, and make your voice heard.
                    </p>
                    
                    <div class="features">
                        <div class="feature">
                            <span class="feature-icon">🗳️</span>
                            <div class="feature-title">Vote on Polls</div>
                            <div class="feature-desc">Cast your vote on trending topics</div>
                        </div>
                        
                        <div class="feature">
                            <span class="feature-icon">📊</span>
                            <div class="feature-title">Create Polls</div>
                            <div class="feature-desc">Start conversations that matter</div>
                        </div>
                        
                        <div class="feature">
                            <span class="feature-icon">👥</span>
                            <div class="feature-title">Join Community</div>
                            <div class="feature-desc">Connect with like-minded people</div>
                        </div>
                    </div>
                    
                    <div class="cta-container">
                        <a href="https://votera.vercel.app/login" class="cta-button">Start Your First Poll</a>
                    </div>
                </div>        
                <div class="footer">
                    <p class="footer-text">
                        Ready to make your mark? Your journey with Votera starts now!
                    </p>
                    <p class="footer-text">
                        Questions? Reply to this email – we're here to help.
                    </p>         
                </div>
            </div>
        </body>
        </html>

`;

module.exports = { welcomeEmailTemplate };