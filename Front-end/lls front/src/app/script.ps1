# $modules = "assigned-experiment", "completed-experiment"
# foreach ($module in $modules) {
#     #create modules
#     ng g m  modules/$module --routing
#     ng g c  modules/$module/pages/$module --skip-tests
#     ng g i  modules/$module/models/$module 
#     ng g effect  modules/$module/store/effects/$module 
#     ng g selector  modules/$module/store/selector/$module 
#     ng g action  modules/$module/store/action/$module 
#     ng g reducer  modules/$module/store/reducer/$module 
#     ng g s  modules/$module/services/$module --skip-tests
#     # New-Item  modules/$module/pages/index.ts
# }
# #create pages in pages
# $pages = "assigned-experiment-details"
# foreach ($page in $pages) {
#     ng g c  modules/assigned-experiment/pages/$page --skip-tests
# }
# # #create page in checkout
# # #create pages in error
# # # $erropages = "error404", "error500","error403"
# # # foreach ($ePage in $erropages) {
# # #     ng g c  modules/errors/pages/$ePage --skip-tests
# # # }
# # #create pages in product
# # $productpages = "experiment"
# # foreach ($p in $productpages) {
# #     ng g c  modules/student/pages/$p --skip-tests
# # }
# # #create core
# # # ng g m  core/core 
# # # $cores = "login", "signup", "send-code", "forget-password", "verify-check", "verify-fail", "verify-success"
# # # foreach ($coreauth in $cores) {
# # #     #create modules
# # #     ng g m  core/auth/$coreauth --routing
# # #     ng g c  core/auth/components/$coreauth --skip-tests
# # # }
# # # ng g i  core/auth/models/auth
# # # ng g s  core/auth/services/auth --skip-tests
# # # New-Item  core/auth/components/index.ts
# # # #create componentsin core 
# # # ng g c  core/components/loader --skip-tests

# # #main layout
# # # $mains = "footer", "header", "layout"
# # # foreach ($mainPage in $mains) {
# # #     #create modules
# # #     ng g c  core/components/main-layout/$mainPage --skip-tests
# # # }
# # # #create guards
# # # $guards = "auth", "login", "cart"
# # # foreach ($guard in $guards) {
# # #     #create modules
# # #     ng g guard core/guards/$guard --implements CanActivate  --skip-tests
# # # }
# # #services 
# # # $services = "http", "interceptors", "loader", "local-storage"
# # # foreach ($service in $services) {
# # #     #create modules
# # #     ng g s core/services/$service --skip-tests
# # # }
# # #create core
# # # ng g m  shared/shared 
# # # $shares = "forms-input","forms-spinner"
# # # foreach ($share in $shares) {
# # #     #create pages
# # #   ng g c  shared/components/$shares --skip-tests
# # # }
# # # ng g pipe  shared/pipes/desc
# # # ng g pipe  shared/pipes/sub
# # # ng g s shared/services/custom-validators --skip-tests
