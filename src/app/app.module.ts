import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './ui/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { ProduitsComponent } from './pages/produits/produits.component';
import { AddProduitComponent } from './pages/add-produit/add-produit.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpdateProduitComponent } from './update-produit/update-produit.component';
import { HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UtilisateursComponent } from './pages/utilisateurs/utilisateurs.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { ListeCategorieComponent } from './pages/categorie/liste-categorie/liste-categorie.component';
import { UpdateCategorieComponent } from './pages/categorie/update-categorie/update-categorie.component';
import { AddCategorieComponent } from './pages/categorie/add-categorie/add-categorie.component';
import { AddMarqueComponent } from './pages/marque/add-marque/add-marque.component';
import { ListMarqueComponent } from './pages/marque/list-marque/list-marque.component';
import { UpdateMarqueComponent } from './pages/marque/update-marque/update-marque.component';
import { AddUserComponent } from './pages/user/add-user/add-user.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FooterComponent } from './ui/footer/footer.component';
import { SlideComponent } from './ui/slide/slide.component';
import { NosProduitsComponent } from './pages/nos-produits/nos-produits.component';
import { ListModeleComponent } from './pages/modele/list-modele/list-modele.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { FiltreComponent } from './ui/filtre/filtre.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AddModeleComponent } from './pages/modele/add-modele/add-modele.component';
import { UpdateImageComponent } from './pages/user/update-image/update-image.component';
import { UpdatePasswordComponent } from './pages/user/update-password/update-password.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ListContactComponent } from './pages/list-contact/list-contact.component';
import { AjouterProduitFrontComponent } from './pages/produits/ajouter-produit-front/ajouter-produit-front.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ActualitesComponent } from './pages/actualites/actualites.component';
import { DarkModeComponent } from './ui/dark-mode/dark-mode.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListArticleComponent } from './pages/article/list-article/list-article.component';
import { AddArticleComponent } from './pages/article/add-article/add-article.component';
import { UpdateArticleComponent } from './pages/article/update-article/update-article.component';
import { CommentsComponent } from './article/comments/comments.component';
import { CommentComponent } from './article/comment/comment.component';
import { ArtComponent } from './article/art/art.component';
import { CommonModule } from '@angular/common';
import { FormCommentComponent } from './article/form-comment/form-comment.component';
import { CreateArticleComponent } from './article/create-article/create-article.component';
import { GouvernoratComponent } from './admin/gouvernorat/gouvernorat.component';
import { DelegationComponent } from './admin/delegation/delegation.component';
import { AddDelegationComponent } from './admin/add-delegation/add-delegation.component';
import { FilterComponent } from './pages/nos-produits/filter/filter.component';
import { ProduitsFiltredComponent } from './pages/nos-produits/produits-filtred/produits-filtred.component';
import { ProduitByIdComponent } from './pages/nos-produits/produit-by-id/produit-by-id.component';
import { ViewUserComponent } from './pages/view-user/view-user.component';
import { FamilleComponent } from './admin/famille/famille.component';
import { AddFamilleComponent } from './admin/add-famille/add-famille.component';
import { TokenInterceptor } from './services/token.interceptor';
import { RxReactiveFormsModule } from '@rxweb/reactive-form-validators';
import { ConditionUtilisationComponent } from './condition-utilisation/condition-utilisation.component';
import { AddGouvernoratComponent } from './admin/add-gouvernorat/add-gouvernorat.component';
import { ReglesDeDiffusionComponent } from './pages/regles-de-diffusion/regles-de-diffusion.component';

import { ListeCartComponent } from './cart/liste-cart/liste-cart.component';
import { CartCompleteComponent } from './cart/cart-complete/cart-complete.component';
import { ListeCartCmdComponent } from './cart/liste-cart-cmd/liste-cart-cmd.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DiscussionComponent } from './pages/discussion/discussion.component';
import { DiscussionsComponent } from './pages/discussions/discussions.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { WriteMessageComponent } from './pages/write-message/write-message.component';
import { MessagesAllComponent } from './pages/messages/messages-all/messages-all.component';
import { ProduitsSearchComponent } from './pages/nos-produits/produits-search/produits-search.component';
import { FacebookLoginProvider,SocialLoginModule,GoogleLoginProvider,SocialAuthServiceConfig } from 'angularx-social-login';
import { LoginModalComponent } from './pages/login/login-modal/login-modal.component';
import { ModifierProduitComponent } from './pages/produits/modifier-produit/modifier-produit.component';
import { ListeCommandeComponent } from './admin/commade/liste-commande/liste-commande.component';
import { PasswordForgotComponent } from './pages/login/password-forgot/password-forgot.component';
import { ResetPasswordForgotComponent } from './pages/user/reset-password-forgot/reset-password-forgot.component';
import { MenuComponent } from './ui/menu/menu.component';
import { AddUserSignUpComponent } from './pages/user/add-user-sign-up/add-user-sign-up.component';
import { AddToCartComponent } from './pages/add-to-cart/add-to-cart.component';
import { AjouterProduitMobileComponent } from './pages/produits/ajouter-produit-mobile/ajouter-produit-mobile.component';
import { ProfileTestComponent } from './pages/profile-test/profile-test.component';
import { ConfigComponent } from './admin/config/config.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { OffresComponent } from './ui/offres/offres.component';
import { HomeSearchComponent } from './pages/home/home-search/home-search.component';
import { CarrousselComponent } from './ui/carroussel/carroussel.component';
import { CategoriesHomeComponent } from './ui/categories-home/categories-home.component';
import { MenuVerticalComponent } from './ui/menu-vertical/menu-vertical.component';
import { CardProduitComponent } from './ui/card-produit/card-produit.component';
import { FilterElementComponent } from './ui/filter-element/filter-element.component';
import { MenuLightComponent } from './ui/menu-light/menu-light.component';
import { Slide2Component } from './ui/slide2/slide2.component';
import { FilterMobileComponent } from './ui/filter-mobile/filter-mobile.component';
import { InscriptionPageComponent } from './pages/user/inscription-page/inscription-page.component';
import { CreateArticleCollapseComponent } from './article/create-article-collapse/create-article-collapse.component';












@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProduitsComponent,
    AddProduitComponent,
    LoginComponent,
    ProfileComponent,
    UpdateProduitComponent,
    ForbiddenComponent,
    UtilisateursComponent,
    InscriptionComponent,
    ListeCategorieComponent,
    UpdateCategorieComponent,
    AddCategorieComponent,
    AddMarqueComponent,
    ListMarqueComponent,
    UpdateMarqueComponent,
    AddUserComponent,
    DashboardComponent,
    FooterComponent,
    SlideComponent,
    NosProduitsComponent,
    ListModeleComponent,
    UpdateUserComponent,
    FiltreComponent,
    AddModeleComponent,
    UpdateImageComponent,
    UpdatePasswordComponent,
    ContactComponent,
    ListContactComponent,
    AjouterProduitFrontComponent,
    BlogComponent,
    ActualitesComponent,
    DarkModeComponent,
    ListArticleComponent,
    AddArticleComponent,
    UpdateArticleComponent,
    CommentsComponent,
    CommentComponent,
    ArtComponent,
    FormCommentComponent,
    CreateArticleComponent,
    GouvernoratComponent,
    DelegationComponent,
    AddDelegationComponent,
    FilterComponent,
    ProduitsFiltredComponent,
    ProduitByIdComponent,
    ViewUserComponent,
    FamilleComponent,
    AddFamilleComponent,
    ConditionUtilisationComponent,
    AddGouvernoratComponent,
    ReglesDeDiffusionComponent,
    ListeCartComponent,
    CartCompleteComponent,
    ListeCartCmdComponent,
    DiscussionComponent,
    DiscussionsComponent,
    UserPanelComponent,
    WriteMessageComponent,
    MessagesAllComponent,
    ProduitsSearchComponent,
    LoginModalComponent,
    ModifierProduitComponent,
    ListeCommandeComponent,
    PasswordForgotComponent,
    ResetPasswordForgotComponent,
    MenuComponent,
    AddUserSignUpComponent,
    AddToCartComponent,
    AjouterProduitMobileComponent,
    ProfileTestComponent,
    ConfigComponent,
    SidebarComponent,
    OffresComponent,
    HomeSearchComponent,
    CarrousselComponent,
    CategoriesHomeComponent,
    MenuVerticalComponent,
    CardProduitComponent,
    FilterElementComponent,
    MenuLightComponent,
    Slide2Component,
    FilterMobileComponent,
    InscriptionPageComponent,
    CreateArticleCollapseComponent,
   
    
   
    
   
   
    
   
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    CommonModule,
    RxReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    SocialLoginModule,
    
  ],
  
  // {provide:HTTP_INTERCEPTORS, useClass : TokenInterceptor,multi:true}
  providers: 
  [
    // { provide : HTTP_INTERCEPTORS,
    //   useClass : TokenInterceptor,
    //   multi : true},
  
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '998943596311-agii5b72rppsj1h1tdp5f75mhnfj22s7.apps.googleusercontent.com' // add web app client id
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('1640008832855470')
          }
        ]
      } as SocialAuthServiceConfig
    } 
    
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
