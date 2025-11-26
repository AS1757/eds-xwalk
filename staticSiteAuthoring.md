# Codebase only site Authoring
This document is a guide to how to edit content and manage assets for Otsuka codebase only sites.

# What are codebase only sites ?
The existing Otsuka Drupal static sites which do not recieve frequent content updates and hence, don't need CMS capabilities are migrated to AEM EDS infrastructure. These sites in their current states are crawled, their code (HTML, CSS and Javscript etc.) and assets (images, font files etc.) are downloaded, checked in to EDS codebase and hosted on EDS server. Below are these sites.

- https://www.doseview.com/
- https://clinical-trials.otsuka.com
- https://www.msrd-us.com/
- https://www.sozoseifoundation.org
- https://theaasc.com
- https://www.gcad.net/ 
- https://www.samsca.com/
- https://www.jynarque.com/ 
- https://www.jynarquehcp.com/ 
- http://social.jynarque.com/
- https://www.adpkdquestions.com/ 
- http://www.bigkidneybigproblem.com/
- https://www.nuedexta.com
- https://nuedextahcp.com
- https://www.pbainfo.org
- https://www.nexusmentalhealth.com
- https://PowerAHEADADHD.com
- https://www.wild5wellnessprogram.com/

# Pre-requisite to Modify/Add content and assets: Local development set up
1. Clone and Checkout the Otsuka git repo by opening the terminal in the intended directory and running the below `git clone https://github.com/AS1757/eds-xwalk.git`
2. Refer https://github.com/AS1757/eds-xwalk/blob/main/README.md to do the local set up.

# Text in HTML pages.
In order to modify or add text/html on the pages please follow below steps:
1. Switch to site branch <URL TBD>
2. Find the corresponding HTML page in `websites/sitename` folder
3. Search for the corresponding section in the html file
4. Add/modify the string 

For example: on https://main--eds-xwalk--as1757.aem.live/websites/bigkidneybigproblem/index.html site, if we want to modify the "Big Kidney Big Problem" button tile to "Big Kidney No Problem !".
<img width="899" height="285" alt="image" src="https://github.com/user-attachments/assets/244f98bd-e1ea-4f35-8fee-5a359e758a12" />


1. Open VS code and search for `index.html` page
2. Search for "Big Kidney Big Problem" text in the file
   
<img width="529" height="209" alt="image" src="https://github.com/user-attachments/assets/f5469217-8b1b-49e5-aeff-7381d358d846" />

4. modify and save it to "Big Kidney No Problem !"
   
<img width="338" height="89" alt="image" src="https://github.com/user-attachments/assets/de72ddcc-915a-4830-9fe4-625f3e5d13c8" />

5. Preview on `http://localhost:3000/websites/bigkidneybigproblem/index.html`

<img width="920" height="317" alt="image" src="https://github.com/user-attachments/assets/9d5d8e45-9b2a-400c-b1bc-25a962f11a6c" />

6. Stage, commit and push your changes to github repository.

7. The changes will get autodeployed to the server and can be validated on https://main--eds-xwalk--as1757.aem.live/websites/bigkidneybigproblem/index.html

   <img width="922" height="269" alt="image" src="https://github.com/user-attachments/assets/b636993c-454a-41b1-ad53-ec8b35dbeb00" />

# Images

# Fonts

# Styles

# Javscript

# SEO Tags

# Redirects

# Sitemap/robo.text



