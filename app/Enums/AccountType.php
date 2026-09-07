<?php

namespace App\Enums;

enum AccountType: string
{
    case Professional = 'professional';
    case Company = 'company';
    case Recruiter = 'recruiter';
    case Administrator = 'administrator';

    public function label(): string
    {
        return match ($this) {
            self::Professional => 'Prestador de serviços',
            self::Company => 'Empresa contratante',
            self::Recruiter => 'Recrutador',
            self::Administrator => 'Administrador',
        };
    }

    /** @return list<self> */
    public static function selfRegistrable(): array
    {
        return [self::Professional, self::Company, self::Recruiter];
    }
}
