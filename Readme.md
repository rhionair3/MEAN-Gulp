# MEAN - GULP
# ==================================
1. Use Mongodb Compass GUI or use CMD mongo
2. write command in cmd : use "database_name"
3. add collection :
    { 
     nama_lengkap: 'Suryo Galih Kencana Harianja',
     status_pegawai: 'Kontrak',
     lama_bekerja: '10 Tahun'
    }
4. Use The Structure File "If No Problem For Structure Files"
5. Node Modules Dependencies and DevDependencies Need To Install :
   - angular/
   - angular-moment/
   - angular-route/
   - body-parser/	
   - bootstrap/	
   - browser-sync/
   - del/	
   - express/	
   - gulp/
   - gulp-cache/
   - gulp-cssnano/
   - gulp-if/	
   - gulp-imagemin/
   - gulp-nodemon/
   - gulp-sass/	
   - gulp-uglify/
   - gulp-useref/
   - jquery/
   - moment/
   - mongoose/
   - run-sequence/
   Dependencies and DevDep above were not listed in my package.json and not install locally project, coz i won't to consume too much drive space and my inet quota.
   So I just install all once to my global dependencies an link all dependencies i need to my project using command :
   "npm link [name of installed global dependencies]" in project root
 6. Run Project using command line "gulp" in project root.
 7. Base Interface web using port :3000 and api form using port :3591. 
 8. The port can be overide manual in app/controllers/CRUDController.js or override from gulpfile.js using script bellow :
    gulp.task('browserSync', ['nodemon'], function () {
      browserSync.init(null, {
      proxy: "http://localhost:5000",
      files: ["app/**/*.*"],
        port: 7000
      });
    });
 9. The API form mongoDB and expressJS in app/src/server.js file
 
 
