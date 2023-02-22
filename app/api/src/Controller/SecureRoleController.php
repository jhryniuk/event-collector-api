<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class SecureRoleController extends AbstractController
{
    public function getSecureRoles()
    {
        $response = [];
        foreach (array_keys($this->getParameter('security.role_hierarchy.roles')) as $key) {
            $response[$key] = ucwords(str_replace('_', ' ', $key));
        }

        foreach ($this->getParameter('security.role_hierarchy.roles') as $roleKey) {
            foreach ($roleKey as $role) {
                if (!array_key_exists($role, $response)) {
                    $response[$role] = ucwords(str_replace('_', ' ', $role));
                }
            }
        }

        $response['ROLE_USER'] = 'ROLE USER';

        return new JsonResponse(
            json_encode(['roles' => $response]),
            Response::HTTP_OK,
            [],
            true
        );
    }
}
