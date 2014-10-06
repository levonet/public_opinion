package PublicOpinion;
use Mojo::Base 'Mojolicious';

# This method will run once at server start
sub startup {
    my $self = shift;

    my $config = $self->plugin('JSONConfig');

    # Auth configuration
    foreach (@{$config->{'Plugin'}->{'Web::Auth'}}) {
        $self->plugin('Web::Auth',
            %{$_},
            on_finished => sub {
                my ($c, $access_token, $account_info) = @_;
                $c->session('access_token' => $access_token);
                $c->session('account_info' => $account_info);
                return $c->redirect_to('index');
            }
        );
    }

    # Documentation browser under "/perldoc"
    $self->plugin('PODRenderer');

    # Router
    my $r = $self->routes;

    # Normal route to controller
    $r->get('/')->to('example#welcome')->name('index');
    $r->get('/login')->to('auth#login');
    $r->post('/login')->to('auth#login');
    $r->post('/logout')->to('auth#logout');
}

1;
