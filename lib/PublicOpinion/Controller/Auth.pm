package PublicOpinion::Controller::Auth;
use Mojo::Base 'Mojolicious::Controller';

# This action will render a template
sub login {
    my $self = shift;

    if (uc($self->req->method) eq 'POST') {
#TODO: Проверка $self->req->param('auth') в конфиге
        $self->session('auth_module' => $self->req->param('auth'));
        return $self->redirect_to(sprintf("/auth/%s/authenticate", lc($self->session('auth_module'))));
    }

    if ($self->session('account_info')) {
        return $self->redirect_to('index');
    }
}

sub logout {
    my $self = shift;

    $self->session(expires => 1);
    $self->redirect_to('index');
}

1;
