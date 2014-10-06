package PublicOpinion::Controller::Example;
use Mojo::Base 'Mojolicious::Controller';
use Data::Dumper;

# This action will render a template
sub welcome {
    my $self = shift;

    unless ( $self->session('account_info') ) {
        return $self->redirect_to('login');
    }

print Dumper($self->session('account_info'), $self->session('access_token'));
#print "[".$self->session('auth_module')."]\n";

  # Render template "example/welcome.html.ep" with message
  $self->render(msg => 'Welcome to the Mojolicious real-time web framework!');
}

1;
