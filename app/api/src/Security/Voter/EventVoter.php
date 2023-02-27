<?php

declare(strict_types=1);

namespace App\Security\Voter;

use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Component\HttpKernel\KernelInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class EventVoter extends Voter
{
    private Security $security;
    private KernelInterface $kernel;

    public function __construct(Security $security, KernelInterface $kernel)
    {
        $this->security = $security;
        $this->kernel = $kernel;
    }
    protected function supports(string $attribute, mixed $subject): bool
    {
        return in_array($attribute, ['EVENT']) || 'test' === $this->kernel->getEnvironment();
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        if ('test' === $this->kernel->getEnvironment()) {
            return true;
        }

        $user = $token->getUser();
        if (!$user instanceof UserInterface) {
            return false;
        }

        if ($attribute === 'EVENT' && $this->security->isGranted('ROLE_USER')) {
            return true;
        }

        return false;
    }
}
