export interface IProducts {
   id: number;
   name: string;
   slug: string;
   description: string;
   excerpt: string;
   price: number;
   tags: string[];
   thumbnail: string;
   image: string[];
   createdAt: Date;
   updatedAt: Date;
}

export default function Home() {
   return (
      <div className="min-h-screen bg-gray-100 p-8">
         <h1 className="text-4xl font-bold mb-8 text-center">
            Welcome to the Home Page
         </h1>
         <div className="flex items-center justify-center min-h-screen bg-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
               {/* Card 1 */}
               <div className="bg-white rounded-lg shadow p-4 flex flex-col relative cursor-pointer hover:shadow-lg transition-shadow">
                  <button className="absolute top-3 right-3 p-1 rounded-full transition-colors text-gray-400 hover:text-black focus:outline-none">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="none"
                        className="w-6 h-6"
                     >
                        <path d="M12.1 8.64l-.1.1-.11-.11C10.14 6.6 7.1 7.24 5.6 9.28c-1.5 2.04-.44 5.12 2.54 7.05l.01.01.01.01 3.36 2.35c.38.27.9.27 1.28 0l3.36-2.35.01-.01.01-.01c2.98-1.93 4.04-5.01 2.54-7.05-1.5-2.04-4.54-2.68-6.5-.64z" />
                     </svg>
                  </button>
                  <img
                     src="https://i.pinimg.com/736x/fb/79/69/fb79699a381d05fffb06d189a8c57009.jpg"
                     alt="Maison Kitsuné denim jacket"
                     className="w-full h-48 object-contain mb-4 rounded"
                  />
                  <div className="font-semibold text-lg mb-1">
                     Maison Kitsuné
                  </div>
                  <div className="text-gray-500 text-sm mb-2">denim jacket</div>
                  <div className="flex items-center gap-2 mb-1">
                     <span className="font-bold text-lg">$333</span>
                  </div>
               </div>
               {/* Card 2 */}
               <div className="bg-white rounded-lg shadow p-4 flex flex-col relative cursor-pointer hover:shadow-lg transition-shadow">
                  <button className="absolute top-3 right-3 p-1 rounded-full transition-colors text-gray-400 hover:text-black focus:outline-none">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="none"
                        className="w-6 h-6"
                     >
                        <path d="M12.1 8.64l-.1.1-.11-.11C10.14 6.6 7.1 7.24 5.6 9.28c-1.5 2.04-.44 5.12 2.54 7.05l.01.01.01.01 3.36 2.35c.38.27.9.27 1.28 0l3.36-2.35.01-.01.01-.01c2.98-1.93 4.04-5.01 2.54-7.05-1.5-2.04-4.54-2.68-6.5-.64z" />
                     </svg>
                  </button>
                  <img
                     src="https://www.russ.co.id/cdn/shop/articles/ide_outfit_old_money.jpg?v=1734593089.jpg"
                     alt="Off-White Eyewear Chester sunglasses"
                     className="w-full h-48 object-contain mb-4 rounded"
                  />
                  <div className="font-semibold text-lg mb-1">
                     Off-White Eyewear
                  </div>
                  <div className="text-gray-500 text-sm mb-2">
                     Chester sunglasses
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                     <span className="font-bold text-lg">$193</span>
                  </div>
               </div>
               {/* Card 3 */}
               <div className="bg-white rounded-lg shadow p-4 flex flex-col relative cursor-pointer hover:shadow-lg transition-shadow">
                  <button className="absolute top-3 right-3 p-1 rounded-full transition-colors text-gray-400 hover:text-black focus:outline-none">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="none"
                        className="w-6 h-6"
                     >
                        <path d="M12.1 8.64l-.1.1-.11-.11C10.14 6.6 7.1 7.24 5.6 9.28c-1.5 2.04-.44 5.12 2.54 7.05l.01.01.01.01 3.36 2.35c.38.27.9.27 1.28 0l3.36-2.35.01-.01.01-.01c2.98-1.93 4.04-5.01 2.54-7.05-1.5-2.04-4.54-2.68-6.5-.64z" />
                     </svg>
                  </button>
                  <img
                     src="https://images.augustman.com/wp-content/uploads/sites/5/2023/09/25161602/untitled-2023-09-22t140702-002-1.jpeg"
                     alt="Brioni fine-knit T-shirt"
                     className="w-full h-48 object-contain mb-4 rounded"
                  />
                  <div className="font-semibold text-lg mb-1">Brioni</div>
                  <div className="text-gray-500 text-sm mb-2">
                     fine-knit T-shirt
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                     <span className="font-bold text-lg">$628</span>
                  </div>
               </div>
               {/* Card 4 */}
               <div className="bg-white rounded-lg shadow p-4 flex flex-col relative cursor-pointer hover:shadow-lg transition-shadow">
                  <button className="absolute top-3 right-3 p-1 rounded-full transition-colors text-gray-400 hover:text-black focus:outline-none">
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        stroke="none"
                        className="w-6 h-6"
                     >
                        <path d="M12.1 8.64l-.1.1-.11-.11C10.14 6.6 7.1 7.24 5.6 9.28c-1.5 2.04-.44 5.12 2.54 7.05l.01.01.01.01 3.36 2.35c.38.27.9.27 1.28 0l3.36-2.35.01-.01.01-.01c2.98-1.93 4.04-5.01 2.54-7.05-1.5-2.04-4.54-2.68-6.5-.64z" />
                     </svg>
                  </button>
                  <img
                     src="https://image.idntimes.com/post/20231014/old-money-ralph-lauren-900x630-5fc5264773d1bbf07bafaa8e9868c56c-9ae04bf1c6f068af65d5783e8c229c09.jpg"
                     alt="Doucal's fringed suede loafers"
                     className="w-full h-48 object-contain mb-4 rounded"
                  />
                  <div className="font-semibold text-lg mb-1">Doucal's</div>
                  <div className="text-gray-500 text-sm mb-2">
                     fringed suede loafers
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                     <span className="font-bold text-lg">$322</span>
                  </div>
               </div>
            </div>
         </div>
         {/* Footer */}
         <footer className="bg-gray-200 mt-16 py-10 px-2 sm:px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-700 w-full">
               {/* Customer Service */}
               <div>
                  <div className="font-bold mb-3">Customer Service</div>
                  <ul className="space-y-2">
                     <li>
                        <a href="#" className="hover:underline">
                           Contact us
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           FAQs
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           Orders and delivery
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           Returns and refunds
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           Payment and pricing
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           Cryptocurrency payments
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           Promotion terms and conditions
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           FARFETCH Customer Promise
                        </a>
                     </li>
                  </ul>
               </div>
               {/* About FARFETCH */}
               <div>
                  <div className="font-bold mb-3">About FARFETCH</div>
                  <ul className="space-y-2">
                     <li>
                        <a href="#" className="hover:underline">
                           About us
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           FARFETCH partner boutiques
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           Careers
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           FARFETCH app
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           Modern slavery statement
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           FARFETCH Advertising
                        </a>
                     </li>
                  </ul>
               </div>
               {/* Discounts and membership */}
               <div>
                  <div className="font-bold mb-3">Discounts and membership</div>
                  <ul className="space-y-2">
                     <li>
                        <a href="#" className="hover:underline">
                           Affiliate program
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           Refer a friend
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           FARFETCH membership
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           Student discount UNiDAYS
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           Student Beans and Graduates
                        </a>
                     </li>
                     <li>
                        <a href="#" className="hover:underline">
                           Student and Youth discount
                        </a>
                     </li>
                  </ul>
                  <div className="mt-6">
                     <div className="font-bold mb-2">Follow us</div>
                     <div className="flex space-x-4 text-xl">
                        <a href="#" aria-label="Instagram">
                           <span className="fi fi-brands-instagram" />
                        </a>
                        <a href="#" aria-label="Facebook">
                           <span className="fi fi-brands-facebook" />
                        </a>
                        <a href="#" aria-label="Pinterest">
                           <span className="fi fi-brands-pinterest" />
                        </a>
                        <a href="#" aria-label="Twitter">
                           <span className="fi fi-brands-twitter" />
                        </a>
                        <a href="#" aria-label="Snapchat">
                           <span className="fi fi-brands-snapchat" />
                        </a>
                        <a href="#" aria-label="YouTube">
                           <span className="fi fi-brands-youtube" />
                        </a>
                     </div>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}
